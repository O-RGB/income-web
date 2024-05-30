"use client";
import IncomeListInDay from "@/components/income/income-screen/income";
import { FetchGetOfDay } from "@/fetcher/get/test.fetch";
import { ConventIncomeSorting } from "@/libs/income-lib";
import { getLocalByKey } from "@/libs/local";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<IIncome[][]>();
  const [loading, setLoading] = useState<boolean>(false);

  const checktofetch = () => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      FetchGetOfDay(getUrl, setLoading).then((data) => {
        const dat = ConventIncomeSorting(data);
        setData(dat);
      });
    }
  };

  useEffect(() => {
    checktofetch();
  }, []);

  return (
    <div>
      {loading ? (
        <>loading</>
      ) : (
        data && <IncomeListInDay incomes={data}></IncomeListInDay>
      )}
    </div>
  );
}
