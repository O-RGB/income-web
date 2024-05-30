// import { GETQueryName } from "@/types/utils/api/general-fetch/query";
import { Fetcher } from "@/utils/fetch/fetch";
import { IncomeModel } from "@/utils/models/income";

export const FetchGetOfDay = async (
  url: string,
  loading?: (load: boolean) => void
) => {
  const res = await Fetcher<undefined, any[]>(
    url,
    {
      data: {
        query: "month",
      },
    },
    loading
  );
  if (res.success) {
    var income: IncomeModel[] = [];
    res.data?.map((list) => {
      income.push(
        new IncomeModel(
          list[0],
          list[1],
          list[2],
          list[3],
          list[4],
          list[5],
          list[6]
        )
      );
    });
    return income;
  }
  return [];
};
