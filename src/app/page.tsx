"use client";

import SettingModal from "@/components/modals/setting";
import IncomeListInDay from "@/components/pages/home/income";
import { GOOGLE_LOCAL_KEY, WALLPAPER_LOCAL_KEY } from "@/config/config";
import { MasterContext } from "@/contexts/master.context";
import {
  convertDateToStoreName,
  getIncomeByKey,
  updateIncomesByStoreName,
} from "@/database/incomes";
import { FetchGetOfDay } from "@/fetcher/POST/incomes.post";

import { setLocal } from "@/libs/local";
import { LocalStorageAllData } from "@/localstorage";
import { useContext, useEffect, useRef, useState } from "react";

export default function Home() {
  // Master
  const { Get, Set, Master, googleKey, Facility } = useContext(MasterContext);

  // Incomes
  const _ResetIncomes = { fetched: true, income: [] };
  const [incomes, setIncomes] = useState<{
    fetched: boolean;
    income: IIncome[];
  }>(_ResetIncomes);
  const [incomesFilter, setIncomesFilter] = useState<IIncomeFilter[]>([]);
  const [incomesLocal, setIncomesLocal] = useState<IIncome[]>([]);

  // Date
  const [dateTemp, setDateTemp] = useState<Date>(new Date());
  const dateSelect = Facility.dateSelected;

  // Setting
  const [openSetting, setSetting] = useState<boolean>(false);
  const [wallpaper, setWallpaper] = useState<string>("");
  const [version, setVersion] = useState<string>();

  // Fetch
  const abortControllerRef = useRef<AbortController | null>(null);

  // Filter
  const [onFilterCategory, setFilterCategory] = useState<boolean>(false);

  const onClickCategory = async (typeId?: string) => {
    if (typeId) {
      setLoad({ isLoad: true });
      const mapping = await Get.getIncomeByTypeId(typeId);
      if (mapping) {
        let incomeFilter: IIncomeFilter[] = [];
        const keys = Array.from(mapping.keys());
        keys.map((key) => {
          const income = mapping.get(key);
          incomeFilter.push({ key: key, income: income ?? [] });
        });
        setIncomesFilter(incomeFilter);
      }
      setFilterCategory(true);
      setLoad({ isLoad: false });
    } else {
      setFilterCategory(false);
      Set.setDateSelected(new Date());
    }
  };

  const setLoad = ({
    isLoad = false,
    delay = 100,
  }: {
    isLoad?: boolean;
    delay?: number;
  }) => {
    setTimeout(() => {
      Facility.initLoad({ fetch: isLoad, waitAction: isLoad });
    }, delay);
  };

  const GetLocalStorage = async () => {
    const { getUrl, wallpaper } = await LocalStorageAllData();
    if (getUrl) {
      Set.setGoogleKey(getUrl);
    }
    if (wallpaper) {
      setWallpaper(wallpaper);
    }
    // if (version) {
    //   setVersion(version);
    // }
    return { getUrl };
  };

  const LocalIncomes = async () => {
    const store_name = convertDateToStoreName(dateSelect);
    const local = await getIncomeByKey(store_name, `${dateSelect.getDate()}`);
    if (local) {
      setIncomesLocal(local);
      setLoad({});
    } else {
      setIncomesLocal([]);
    }
  };

  const getIncomeSheets = async (API_KEY?: string, date: Date = new Date()) => {
    const key = API_KEY ? API_KEY : googleKey !== "" ? googleKey : undefined;
    if (key) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      // await LocalIncomes();
      await FetchGetOfDay(key, date, undefined, abortController.signal)
        .then((incomes) => {
          if (incomes) {
            updateIncomesByStoreName(incomes, dateSelect);
            setIncomes((value) => {
              const draft = value.income.filter(
                (draft) => draft.draft === true
              );
              return { fetched: true, income: [...incomes, ...draft] };
            });
            setLoad({});
          }
        })
        .catch((e) => {
          setIncomes(_ResetIncomes);
        });
    } else {
      setIncomes(_ResetIncomes);
    }
  };

  const getData = async (API_KEY?: string) => {
    // Check Config Version Server
    // Get.getConfig(API_KEY, version);
    // Get Incomes Data
    getIncomeSheets(API_KEY);
    // Get Types on Local
    Get.getTypes(API_KEY, { local: true });
    // Get Types For Mapping Local Data
    Get.getTypes(API_KEY);
    // Get Autocomplete
    await Get.getDuplecate(API_KEY);
    // Get Analysis
    await Get.getDisplay(API_KEY);
  };

  // First Render
  useEffect(() => {
    console.log("const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;",process.env.NEXT_PUBLIC_API_URL)
    setLoad({ isLoad: true });
    GetLocalStorage().then((params) => {
      if (params.getUrl) {
        Set.setGoogleKey(params.getUrl);
        getData(params.getUrl ?? undefined);

        // FetchGetOfDay(params.getUrl,new Date()).then((res) => console.log(res))
      }
    });
  }, []);

  // On Date Change
  useEffect(() => {
    setLoad({ isLoad: true });
    setIncomes(_ResetIncomes);
    const timeer = setTimeout(() => {
      Set.setDateSelected(dateSelect);
      getIncomeSheets(undefined, dateSelect);
      // When the date of the selected month is not the same
      if (dateTemp.getMonth() !== dateSelect.getMonth()) {
        // Get new analysis
        Get.getDisplay(undefined, dateSelect);
      }
      setDateTemp(dateSelect);
    }, 100);

    return () => {
      clearInterval(timeer);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [dateSelect]);

  return (
    <div className="relative min-h-screen select-none">
      {wallpaper && (
        <div className="fixed w-full h-full top-0  ">
          <img
            src={wallpaper}
            alt=""
            className="w-full h-full object-cover  "
          />
        </div>
      )}

      <SettingModal
        onChangeGoogleSheetKey={(e) => {
          const res = setLocal(GOOGLE_LOCAL_KEY, e.google_sheets);
          if (res) {
            window.location.reload();
          }
        }}
        onChangeWallpaper={(url) => {
          const res = setLocal(WALLPAPER_LOCAL_KEY, url ?? "");
          if (res) {
            setWallpaper(url ?? "");
          }
        }}
        close={() => {
          setSetting(false);
        }}
        open={openSetting}
      ></SettingModal>

      <IncomeListInDay
        version={version}
        dateSelect={dateSelect}
        onSelectDate={Set.setDateSelected}
        incomes={incomes.income}
        incomesLocal={incomesLocal}
        loading={Facility.loading}
        Set={Set}
        onClickSetting={() => {
          setSetting(true);
        }}
        onFilterCategory={onFilterCategory}
        onClickCategory={onClickCategory}
        master={{
          dupOfMonth: Facility.autoSelect,
          typesOfItems: Master.category,
          IGetDisplayCal: Facility.analytics,
        }}
        incomesFilter={incomesFilter}
      ></IncomeListInDay>
    </div>
  );
}
