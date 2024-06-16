"use client";
import IncomeListInDay from "@/components/income/income-screen/income";
import {
  FetchGetDisplayCal,
  FetchGetDupOfMonth,
  FetchGetOfDay,
} from "@/fetcher/GET/incomes.fetch";
import { FetchTypesIncome } from "@/fetcher/GET/types.fetch";
import { AddIncomesList, DeleteIncome } from "@/fetcher/POST/incomes.post";
import { GenOption } from "@/libs/gen-options";
import { getLocalByKey, setLocal } from "@/libs/local";
import { useEffect, useState } from "react";

export default function Home() {
  const [incomes, setIncomes] = useState<IIncome[]>([]);
  const [loading, setLoading] = useState<ILoading>({
    pageLoad: false,
    waitActioning: false,
  });
  const [duplicateItems, setDuplicate] = useState<RadioOptions[]>([]);
  const [displayCal, setDisplayCal] = useState<IGetDisplayCal>();
  const [IncomeTypesOptions, setIncomeTypesOptions] = useState<RadioOptions[]>(
    []
  );
  const [dateSelect, setDateSelect] = useState<Date>(new Date());

  const initLoad = ({
    fetch,
    waitAction,
    dateChange,
  }: {
    fetch?: boolean;
    waitAction?: boolean;
    dateChange?: boolean;
  }) => {
    // if (fetch && !loading.pageLoad) {
    //   return;
    // }

    // if (waitAction && !loading.waitActioning) {
    //   return;
    // }

    // if (dateChange && !loading.dateChange) {
    //   return;
    // }

    setLoading({
      pageLoad: fetch ? true : false,
      waitActioning: waitAction ? true : false,
      dateChange: dateChange ? true : false,
    });

    console.log({
      pageLoad: fetch ? true : false,
      waitActioning: waitAction ? true : false,
      dateChange: dateChange ? true : false,
    });
  };

  const onSelectDate = (date: Date) => {
    initLoad({ dateChange: true });
    setDateSelect(date);
    getIncomeSheets(date);
    getDisplay(date);
  };

  const onChangeInput = (value: string) => {
    setLocal("google_sheets", value);
  };

  const getTypes = async () => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      const incomes = await FetchTypesIncome(getUrl);
      if (incomes) {
        const options = GenOption("name", "typeId", incomes);
        setIncomeTypesOptions(options);
      }
    }
  };

  const getDuplecate = async () => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      const incomes = await FetchGetDupOfMonth(getUrl);
      if (incomes) {
        const convent = incomes.map((data) => {
          return { name: data, value: data };
        });
        const options = GenOption("name", "value", convent);
        setDuplicate(options);
      }
    }
  };

  const getDisplay = async (date: Date = new Date()) => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      const cal = await FetchGetDisplayCal(getUrl, date);
      if (cal) {
        setDisplayCal(cal);
      }
    }
  };

  const getIncomeSheets = (date?: Date) => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      setIncomes([]);
      initLoad({ fetch: true });
      FetchGetOfDay(getUrl, date ? date : new Date())
        .then((incomes) => {
          if (incomes) {
            setIncomes(incomes);
          }
        })
        .catch((e) => {
          setIncomes([]);
        })
        .finally(() => {
          initLoad({ fetch: false, waitAction: false });
        });
    } else {
      setIncomes([]);
      initLoad({ fetch: false, waitAction: false });
    }
  };

  const onAddIncome = async (income: IIncome[]) => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      initLoad({ waitAction: true });
      return AddIncomesList(getUrl, { incomes: income }).finally(() => {
        initLoad({ waitAction: false });
      });
    } else {
      return {
        incomes: undefined,
        message: undefined,
        success: false,
      } as IGeneralReturnFetch<undefined>;
    }
  };
  const onDeleteIncome = async (sheetsIndex: number) => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      initLoad({ waitAction: true });
      return DeleteIncome(getUrl, sheetsIndex).finally(() => {
        initLoad({ waitAction: false });
      });
    } else {
      return {
        incomes: undefined,
        message: undefined,
        success: false,
      } as IGeneralReturnFetch<undefined>;
    }
  };

  const getData = () => {
    getIncomeSheets();
    getTypes();
    getDuplecate();
    getDisplay();
  };

  useEffect(() => {
    if (incomes.length === 0) {
      getData();
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
        <button className="p-2 border" onClick={() => getIncomeSheets()}>
          Update
        </button>
      </div>

      <IncomeListInDay
        master={{
          dupOfMonth: duplicateItems,
          typesOfItems: IncomeTypesOptions,
          IGetDisplayCal: displayCal,
        }}
        dateSelect={dateSelect}
        onAddIncome={onAddIncome}
        deleteIncome={onDeleteIncome}
        onSelectDate={onSelectDate}
        incomes={incomes}
        loading={loading}
      ></IncomeListInDay>
    </div>
  );
}
