"use client";
import { Fetcher } from "@/utils/fetch/fetch";

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
