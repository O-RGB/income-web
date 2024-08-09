import { getDB } from "./db";

export const setTypesLocal = async (types: IIncomeTypes[]) => {
  const store_key = "Types";
  const db = await getDB(store_key);
  const tx = db.transaction(store_key, "readwrite");
  const store = tx.objectStore(store_key);
  await store.clear();
  for (let index = 0; index < types.length; index++) {
    const element = types[index];
    await store.add(element, element.typeId);
  }
};

export const getTypesLocal = async (): Promise<IIncomeTypes[]> => {
  const store_key = "Types";
  const db = await getDB(store_key);
  const tx = db.transaction(store_key, "readonly");
  const store = tx.objectStore(store_key);
  return (await store.getAll()) as any;
};
