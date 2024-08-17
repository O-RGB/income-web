import { Fetcher } from "@/utils/fetch/fetch";
import { IncomeTypesModel } from "@/utils/models/types";

export const FetchTypesIncome = async (
  key: string,
  loading?: (load: boolean) => void
) => {
  const res = await Fetcher<undefined, any[]>(
    key,
    {
      method: "POST",
      data: {
        query: "POST_get_types",
      },
    },
    loading
  );
  if (res.success === true) {
    var types: IIncomeTypes[] = [];
    res.data?.map((list) => {
      types.push(
        new IncomeTypesModel(list[0], list[1], list[2], list[3], list[4])
      );
    });
    return types;
  }

  return res.data;
};

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
