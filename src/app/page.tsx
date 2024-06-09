"use client";

import IncomeListInDay from "@/components/income/income-screen/income";
import { FetchGetOfDay } from "@/fetcher/GET/incomes.fetch";
import { FetchTypesIncome } from "@/fetcher/GET/types.fetch";
import {
  AddIncome,
  AddIncomesList,
  DeleteIncome,
} from "@/fetcher/POST/incomes.post";
import { GenOption } from "@/libs/gen-options";
// import { ConventIncomeSorting } from "@/libs/income-lib";
import { getLocalByKey, setLocal } from "@/libs/local";
import { useEffect, useState } from "react";

export default function Home() {
  const [incomes, setIncomes] = useState<IIncome[]>();
  const [loading, setLoading] = useState<ILoading>({
    pageLoad: false,
    waitActioning: false,
  });
  // const [apiFetching, setFetching] = useState<boolean>(false);
  const [IncomeTypesOptions, setIncomeTypesOptions] = useState<RadioOptions[]>(
    []
  );
  const [dateSelect, setDateSelect] = useState<Date>(new Date());

  const initLoad = ({
    fetch,
    waitAction,
  }: {
    fetch?: boolean;
    waitAction?: boolean;
  }) => {
    if (fetch && !loading.pageLoad) {
      return;
    }

    if (waitAction && !loading.waitActioning) {
      return;
    }

    setLoading({
      pageLoad: fetch ? true : false,
      waitActioning: waitAction ? true : false,
    });
  };

  const onSelectDate = (date: Date) => {
    setDateSelect(date);
    getIncomeSheets(date);
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

  const getIncomeSheets = (date?: Date) => {
    let getUrl = getLocalByKey("google_sheets");
    if (getUrl) {
      setIncomes(undefined);
      initLoad({ fetch: true });
      FetchGetOfDay(getUrl, date ? date : new Date())
        .then((incomes) => {
          if (incomes) {
            console.log("new update", incomes);
            // const dat = ConventIncomeSorting(incomes);
            setIncomes(incomes);
          }
        })
        .catch((e) => {
          setIncomes(undefined);
        })
        .finally(() => {
          initLoad({ fetch: false, waitAction: false });
        });
    } else {
      setIncomes(undefined);
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
  };

  useEffect(() => {
    if (!incomes) {
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
        dateSelect={dateSelect}
        IncomeTypesOptions={IncomeTypesOptions}
        onAddIncome={onAddIncome}
        deleteIncome={onDeleteIncome}
        onSelectDate={onSelectDate}
        incomes={incomes}
        loading={loading}
      ></IncomeListInDay>
    </div>
  );
}
