"use client";
import { DateFormat } from "@/libs/date-lib";
import { Fetcher } from "@/utils/fetch/fetch";
import { IncomeModel } from "@/utils/models/income";

export const AddIncome = (
  key: string,
  input: IIncome,
  loading?: (load: boolean) => void
) => {
  return Fetcher<IIncome, IIncome>(
    key,
    {
      method: "POST",
      data: { ...input, query: "POST_insert_income_on_day" },
    },
    loading
  );
};

export const AddIncomesList = (
  key: string,
  input: IIncomesListAdd,
  loading?: (load: boolean) => void
) => {
  return Fetcher<IIncomesListAdd, IIncome[]>(
    key,
    {
      method: "POST",
      data: { ...input, query: "POST_insert_incomes_list" },
    },
    loading
  );
};

export const AddIncomeByIndexSheets = (
  key: string,
  input: IIncome,
  loading?: (load: boolean) => void
) => {
  return Fetcher<IIncome, IIncome>(
    key,
    {
      method: "POST",
      data: { ...input, query: "POST_insert_income" },
    },
    loading
  );
};

export const DeleteIncome = (
  key: string,
  input: IIncomeDelete,
  loading?: (load: boolean) => void
) => {
  return Fetcher<IIncomeDelete, boolean>(
    key,
    {
      method: "POST",
      data: {
        sheetsIndex: input.sheetsIndex,
        sheetsName: input.sheetsName,
        sheetsDate: input.sheetsDate,
        query: "POST_delete_income",
      },
    },
    loading
  );
};

export const EditIncome = (
  key: string,
  input: IIncomeEditInput,
  loading?: (load: boolean) => void
) => {
  return Fetcher<IIncomeEditInput, boolean>(
    key,
    {
      method: "POST",
      data: {
        newIncome: input.newIncome,
        sheetsDateStr: input.sheetsDateStr,
        sheetsIndex: input.sheetsIndex,
        query: "POST_edit_income",
      },
    },
    loading
  );
};
export const MoveIncome = (
  key: string,
  input: IIncomeMoveInput,
  loading?: (load: boolean) => void
) => {
  return Fetcher<IIncomeMoveInput, boolean>(
    key,
    {
      method: "POST",
      data: {
        rowIndexMove: input.rowIndexMove,
        sheetsDate: input.sheetsDate,
        query: "POST_move_rows_income",
      },
    },
    loading
  );
};

export const FetchGetOfDay = async (
  url: string,
  setDay: Date,
  loading?: (load: boolean) => void,
  signal?: AbortSignal,
  cache?: RequestCache | undefined
) => {
  const initDate = DateFormat(setDay, "MM-DD-YYYY");
  const res = await Fetcher<{ day: string }, any[]>(
    url,
    {
      method: "POST",
      data: {
        query: "POST_get_day",
        day: initDate,
      },
    },
    loading,
    signal,
    cache
  );

  if (res.success === true) {
    var income: IncomeModel[] = [];
    res.data?.map((list, index) => {
      income.push(
        new IncomeModel(
          list[0],
          index,
          new Date(list[1]),
          list[2],
          list[3],
          list[4],
          list[5],
          list[6],
          list[7],
          list[8]
        )
      );
    });
    return income;
  }
  return undefined;
};

export const GetIncomeByTypeId = async (
  key: string,
  input: IGetIncomesByTypeIdInput
) => {
  const res = await Fetcher<IGetIncomesByTypeIdInput, IGetIncomesByTypeId>(
    key,
    {
      method: "POST",
      data: {
        typeId: input.typeId,
        query: "POST_get_data_of_type",
      },
    }
  );
  if (res.success === true) {
    var income = new Map<string, IncomeModel[]>();
    const data = res.data!;
    const keys = Object.keys(data);
    keys.map((k) => {
      const incomeTemp = data[k];
      let incomeList: IncomeModel[] = [];
      incomeTemp.map((ins) => {
        const convert = new IncomeModel(
          ins[0],
          0,
          ins[1],
          ins[2],
          ins[3],
          ins[4],
          ins[5],
          ins[6],
          ins[7],
          ins[8]
        );
        incomeList.push(convert);
      });
      income.set(k, incomeList);
    });
    console.log(income);

    return income;
  }
};

export const FetchGetDupOfMonth = async (
  url: string,
  loading?: (load: boolean) => void
) => {
  const res = await Fetcher<undefined, string[]>(
    url,
    {
      method: "POST",
      data: {
        query: "POST_get_dup",
      },
    },
    loading
  );

  if (res.success === true) {
    return res.data;
  }
  return undefined;
};

export const FetchGetDisplayCal = async (
  url: string,
  date: Date,
  loading?: (load: boolean) => void
) => {
  const initDate = DateFormat(date, "MM-DD-YYYY");
  const res = await Fetcher<any, IGetDisplayCal>(
    url,
    {
      method: "POST",
      data: {
        query: "POST_get_display",
        date: initDate,
      },
    },
    loading
  );

  if (res.success === true) {
    return res.data;
  }
  return undefined;
};
