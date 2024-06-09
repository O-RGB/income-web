"use client";
import { DateFormat } from "@/libs/date-lib";
import { Fetcher } from "@/utils/fetch/fetch";
import { IncomeModel } from "@/utils/models/income";

export const FetchGetOfDay = async (
  url: string,
  setDay: Date,
  loading?: (load: boolean) => void
) => {
  const initDate = DateFormat(setDay, "MM-DD-YYYY");
  const res = await Fetcher<{ day: string }, any[]>(
    url,
    {
      data: {
        query: "day",
        day: initDate,
      },
    },
    loading
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
          list[7]
        )
      );
    });
    return income;
  }
  return undefined;
};
export const FetchGetOfMonth = async (
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

  if (res.success === true) {
    var income: IncomeModel[] = [];
    res.data?.map((list, index) => {
      income.push(
        new IncomeModel(
          list[0],
          index,
          list[1],
          list[2],
          list[3],
          list[4],
          list[5],
          list[6],
          list[7]
        )
      );
    });
    return income;
  }
  return undefined;
};
