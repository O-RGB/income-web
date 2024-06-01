"use client";
import IncomeListInDay from "@/components/income/income-screen/income";
import { FetchGetOfDay } from "@/fetcher/get/test.fetch";
import { ConventIncomeSorting } from "@/libs/income-lib";
import { getLocalByKey, setLocal } from "@/libs/local";
import { useEffect, useState } from "react";
const domain = process.env.API_URL;
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

  const GetURL = (path: string) => {
    return `https://${domain}/${path}`;
  };

  useEffect(() => {
    checktofetch();
  }, []);
  const [f, setf] = useState<string>("");
  const testFetcj = () => {
    const url = GetURL(f);
    fetch(url, { method: "GET" })
      .then((data) => {})
      .finally(() => {
        console.log("URL F: ", f);
        console.log(data);
      });
    fetch(`https://script.google.com/macros/s/${f}`, { method: "GET" })
      .then((data) => {})
      .finally(() => {
        console.log("URL F: ", f);
        console.log(data);
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
