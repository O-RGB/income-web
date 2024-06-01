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

  const [f, setf] = useState<string>("");
  const testFetcj = () => {
    const remove = process.env.VERCEL_URL;
    var url = f + remove !== undefined ? "" : "";

    fetch(url, { method: "GET", cache: "no-store" })
      .then((data) => {
        console.log(data);
      })
      .finally(() => {
        console.log("VERCEL_URL: ", remove);
        console.log("URL: ", url);
      });
    fetch(f, { method: "GET", cache: "no-store" })
      .then((data) => {})
      .finally(() => {
        console.log("URL F: ", f);
        console.log(data);
      });
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
    fetch(NEXT_PUBLIC_API_URL + f, {
      method: "GET",
      cache: "no-store",
    })
      .then((data) => {
        console.log(data);
      })
      .finally(() => {
        console.log("URL NEXT_PUBLIC_API_URL: ", NEXT_PUBLIC_API_URL + f);
      });
  };

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
      <div>Test Fecth</div>
      <div className="border p-2 flex gap-2">
        <input
          className="border w-full"
          placeholder="google sheets url"
          type="text"
          onChange={(e) => {
            setf(e.target.value);
          }}
        />
        <button className="p-2 border" onClick={testFetcj}>
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
