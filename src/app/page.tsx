"use client";
import IncomeListInDay from "@/components/income/income-screen/income";
import { FetchGetOfDay } from "@/fetcher/GET/incomes.fetch";
import { FetchTypesIncome } from "@/fetcher/GET/types.fetch";
import { AddIncome, DeleteIncome } from "@/fetcher/POST/incomes.post";
import { GenOption } from "@/libs/gen-options";
// import { ConventIncomeSorting } from "@/libs/income-lib";
import { getLocalByKey, setLocal } from "@/libs/local";
import { useEffect, useState } from "react";
export default function Home() {
  const [data, setData] = useState<IIncome[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [stopFetch, setFetching] = useState<boolean>(false);
  const [IncomeTypesOptions, setIncomeTypesOptions] = useState<RadioOptions[]>(
    []
  );
  const [dateSelect, setDateSelect] = useState<Date>(new Date());

  const onSelectDate = (date: Date) => {
    setDateSelect(date);
    checktofetch(date);
  };

  const onChangeInput = (value: string) => {
    setLocal("google_sheets", value);
  };

  const getTypes = async () => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      const data = await FetchTypesIncome(getUrl);
      if (data) {
        const options = GenOption("name", "typeId", data);
        setIncomeTypesOptions(options);
      }
    }
  };

  const checktofetch = (date?: Date) => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      setFetching(true);
      FetchGetOfDay(getUrl, date ? date : new Date(), setLoading)
        .then((data) => {
          if (data) {
            console.log("new update", data);
            // const dat = ConventIncomeSorting(data);
            setData(data);
          }
        })
        .catch((e) => {
          setData(undefined);
        })
        .finally(() => {
          setFetching(false);
        });
    } else {
      setData(undefined);
      setFetching(false);
    }
  };

  const onAddIncome = async (income: IIncome) => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      setFetching(true);
      return AddIncome(getUrl, income).finally(() => {
        setFetching(false);
      });
    } else {
      return {
        data: undefined,
        message: undefined,
        success: false,
      };
    }
  };
  const onDeleteIncome = async (sheetsIndex: number) => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      setFetching(true);
      return DeleteIncome(getUrl, sheetsIndex).finally(() => {
        setFetching(false);
      });
    } else {
      return {
        data: undefined,
        message: undefined,
        success: false,
      };
    }
  };

  const fetchData = () => {
    checktofetch();
    getTypes();
  };

  useEffect(() => {
    if (!data) {
      fetchData();
    }
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
        <button className="p-2 border" onClick={() => checktofetch()}>
          Update
        </button>
      </div>

      <IncomeListInDay
        dateSelect={dateSelect}
        IncomeTypesOptions={IncomeTypesOptions}
        stopFetch={stopFetch}
        addIncome={onAddIncome}
        deleteIncome={onDeleteIncome}
        onSelectDate={onSelectDate}
        incomes={data ? data : []}
      ></IncomeListInDay>
    </div>
  );
}
