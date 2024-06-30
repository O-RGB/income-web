import { Fetcher } from "@/utils/fetch/fetch";

export const CreateType = (key: string, input: IIncomeTypes) => {
  return Fetcher<IIncomeTypes, IIncomeTypes>(key, {
    method: "POST",
    data: {
      ...input,
      query: "POST_insert_type",
    },
  });
};
export const EditType = (key: string, input: IIncomeTypes) => {
  return Fetcher<IIncomeTypes, IIncomeTypes>(key, {
    method: "POST",
    data: {
      ...input,
      query: "POST_update_type",
    },
  });
};
export const DeleteType = (key: string, rowIndex: number) => {
  return Fetcher<{ rowIndex: number }, boolean>(key, {
    method: "POST",
    data: {
      rowIndex,
      query: "POST_delete_type",
    },
  });
};
