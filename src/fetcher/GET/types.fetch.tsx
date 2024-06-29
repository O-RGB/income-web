"use client";
import { Fetcher } from "@/utils/fetch/fetch";
import { IncomeTypesModel } from "@/utils/models/types";

export const FetchTypesIncome = async (
  key: string,
  loading?: (load: boolean) => void
) => {
  const res = await Fetcher<undefined, any[]>(
    key,
    {
      data: {
        query: "types",
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
