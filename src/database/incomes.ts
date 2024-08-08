import { IncomeModel } from "@/utils/models/income";
import { getDB } from "./db";
import { getStoreNameByDate } from "./lib";

export const getIncomeByKey = async (
  store_name: string,
  key: string
): Promise<IncomeModel[]> => {
  const db = await getDB(store_name);
  const tx = db.transaction(store_name, "readonly");
  const store = tx.objectStore(store_name);
  const data = await store.get(key);
  await tx.done;
  return data;
};

export const setIncomesByStoreName = async (
  incomes: IIncome[],
  daySelected: Date,
  store_name?: string
) => {
  let store_key = store_name ? store_name : convertDateToStoreName(daySelected);
  const db = await getDB(store_key);
  const tx = db.transaction(store_key, "readwrite");
  await tx.objectStore(store_key).add(incomes, `${daySelected.getDate()}`);
  await tx.done;
};

export const updateIncomesByStoreName = async (
  incomes: IIncome[],
  daySelected: Date,
  store_name?: string
) => {
  let store_key = store_name ? store_name : convertDateToStoreName(daySelected);
  const db = await getDB(store_key);
  const tx = db.transaction(store_key, "readwrite");
  const store = tx.objectStore(store_key);
  const key = daySelected.getDate();
  const existingEntry = await store.get(`${key}`);
  if (existingEntry) {
    await store.put(incomes, `${key}`);
  } else {
    setIncomesByStoreName(incomes, daySelected);
    console.error(`No entry found for key: ${key}`);
  }
  await tx.done;
};

export const addIncomesLocal = async (
  incomes: IIncome[],
  daySelected: Date,
  store_name?: string
) => {
  let store_key = store_name ? store_name : convertDateToStoreName(daySelected);
  const db = await getDB(store_key);
  const tx = db.transaction(store_key, "readwrite");
  const store = tx.objectStore(store_key);
  const key = daySelected.getDate();

  let existingEntry: IIncome[] = (await store.get(`${key}`)) ?? [];

  if (existingEntry) {
    existingEntry.push(...incomes);
    await store.put(existingEntry, `${key}`);
  } else {
    setIncomesByStoreName(incomes, daySelected);
  }

  await tx.done;
};
export const updateIncomesLocal = async (
  incomes: IIncome,
  daySelected: Date,
  store_name?: string
) => {
  let store_key = store_name ? store_name : convertDateToStoreName(daySelected);
  const db = await getDB(store_key);
  const tx = db.transaction(store_key, "readwrite");
  const store = tx.objectStore(store_key);
  const key = daySelected.getDate();

  let existingEntry: IIncome[] = (await store.get(`${key}`)) ?? [];

  if (existingEntry) {
    let index = existingEntry.findIndex(
      (data) => data.sheetsIndex === incomes.sheetsIndex
    );
    if (index >= 0) {
      existingEntry[index] = {
        ...incomes,
        fetching: false,
        draft: false,
        edit: false,
      };
    }
    await store.put(existingEntry, `${key}`);
  }

  await tx.done;
};

export const removeIncomesLocal = async (
  sheetsIndex: number,
  daySelected: Date,
  store_name?: string
) => {
  let store_key = store_name ? store_name : convertDateToStoreName(daySelected);
  const db = await getDB(store_key);
  const tx = db.transaction(store_key, "readwrite");
  const store = tx.objectStore(store_key);
  const key = daySelected.getDate();

  let existingEntry: IIncome[] = (await store.get(`${key}`)) ?? [];

  if (existingEntry) {
    existingEntry = existingEntry.filter((x) => x.sheetsIndex !== sheetsIndex);
    await store.put(existingEntry, `${key}`);
  }

  await tx.done;
};

export const updateIncomesByIncomsSheets = async (
  incomes: IIncome[],
  daySelected: Date,
  store_name?: string
) => {
  let store_key = store_name ? store_name : convertDateToStoreName(daySelected);
  const db = await getDB(store_key);
  const tx = db.transaction(store_key, "readwrite");
  const store = tx.objectStore(store_key);
  const key = daySelected.getDate();

  let existingEntry: IIncome[] = (await store.get(`${key}`)) ?? [];

  if (existingEntry) {
    incomes.map((ins) => {
      let find = existingEntry.findIndex(
        (x) => x.sheetsIndex === ins.sheetsIndex
      );
      if (find >= 0) {
        existingEntry[find] = ins;
      }
    });
    await store.put(existingEntry, `${key}`);
  } else {
    setIncomesByStoreName(incomes, daySelected);
  }

  await tx.done;
};

export const convertDateToStoreName = (date: Date) => {
  return getStoreNameByDate(date);
};
