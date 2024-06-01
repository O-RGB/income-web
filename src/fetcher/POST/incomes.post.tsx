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
      data: { ...input, query: "POST_insert_income" },
    },
    loading
  );
};
export const DeleteIncome = (
  key: string,
  sheetsIndex: number,
  loading?: (load: boolean) => void
) => {
  return Fetcher<IIncomeDelete, boolean>(
    key,
    {
      method: "POST",
      data: { sheetsIndex, query: "POST_delete_income" },
    },
    loading
  );
};
