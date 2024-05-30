"use client";
import IncomeListInDay from "@/components/income/income-screen/income";
import { FetchGetOfDay } from "@/fetcher/get/test.fetch";
import { ConventIncomeSorting } from "@/libs/income-lib";
import { getLocalByKey, setLocal } from "@/libs/local";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<IIncome[][] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeInput = (value: string) => {
    setLocal("google_sheets", value);
  };

  const checktofetch = () => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      FetchGetOfDay(getUrl, setLoading)
        .then((data) => {
          if (data) {
            const dat = ConventIncomeSorting(data);
            setData(dat);
          }
        })
        .catch((e) => {
          setData(undefined);
        });
    } else {
      setData(undefined);
    }
  };

  useEffect(() => {
    checktofetch();
  }, []);

  return (
    <div>
      <div className="border p-2 flex gap-2">
        <input
          className="border w-full"
          placeholder="google sheets url"
          type="text"
          onChange={(e) => {
            onChangeInput(e.target.value);
          }}
        />
        <button className="p-2 border" onClick={checktofetch}>
          Update
        </button>
      </div>
      {loading ? (
        <>loading</>
      ) : (
        <IncomeListInDay incomes={data}></IncomeListInDay>
      )}
    </div>
  );
}
