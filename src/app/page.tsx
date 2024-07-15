"use client";

import SettingModal from "@/components/modals/setting";
import IncomeListInDay from "@/components/pages/home/income";

import { MasterContext } from "@/contexts/master.context";
import { FetchGetOfDay } from "@/fetcher/GET/incomes.fetch";
import {
  AddIncomesList,
  DeleteIncome,
  EditIncome,
} from "@/fetcher/POST/incomes.post";
import { getLocalByKey, setLocal } from "@/libs/local";
import { useContext, useEffect, useRef, useState } from "react";

export default function Home() {
  const { Get, Master, Set, googleKey, Facility } = useContext(MasterContext);
  const [wallpaper, setWallpaper] = useState<string>("");
  const [version, setVersion] = useState<string>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const [incomes, setIncomes] = useState<{
    fetched: boolean;
    income: IIncome[];
  }>({
    fetched: false,
    income: [],
  });
  const [loading, setLoading] = useState<ILoading>({
    pageLoad: true,
    waitActioning: false,
  });

  const [dateTemp, setDateTemp] = useState<Date>(new Date());
  const [dateSelect, setDateSelect] = useState<Date>(new Date());

  const localLoad = async () => {
    let getUrl = getLocalByKey("google_sheets");
    let wallpaper = getLocalByKey("wallpaper");
    let version = getLocalByKey("version");
    if (getUrl) {
      Set.setGoogleKey(getUrl);
    }
    if (wallpaper) {
      setWallpaper(wallpaper);
    }

    if (version) {
      setVersion(version);
    }

    return { getUrl, version };
  };
  const initLoad = ({
    fetch,
    waitAction,
    dateChange,
  }: {
    fetch?: boolean;
    waitAction?: boolean;
    dateChange?: boolean;
  }) => {
    setLoading({
      pageLoad: fetch ? true : false,
      waitActioning: waitAction ? true : false,
      dateChange: dateChange ? true : false,
    });
  };
  const getIncomeSheets = async (date?: Date, url?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    if (key) {
      // ยกเลิก fetch ก่อนหน้าถ้ามี
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      initLoad({ fetch: true, waitAction: true });

      await FetchGetOfDay(
        key,
        date ? date : new Date(),
        undefined,
        abortController.signal
      )
        .then((incomes) => {
          if (incomes) {
            setIncomes({
              fetched: true,
              income: incomes,
            });
            setTimeout(() => {
              initLoad({ fetch: false, waitAction: false });
            }, 100);
          }
        })
        .catch((e) => {
          console.log(e);
          setIncomes({
            fetched: true,
            income: [],
          });
          // initLoad({ fetch: false, waitAction: false });
        });
      // .finally(() => {
      //   setTimeout(() => {
      //     initLoad({ fetch: false, waitAction: false });
      //   }, 100);
      // });
    } else {
      setIncomes({
        fetched: false,
        income: [],
      });
      // initLoad({ fetch: false, waitAction: false });
    }
  };
  const onAddIncome = async (income: IIncome[]) => {
    if (googleKey) {
      initLoad({ waitAction: true });
      return AddIncomesList(googleKey, { incomes: income }).finally(() => {
        Get.getDisplay(undefined, googleKey);
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
  const onDeleteIncome = async (input: IIncomeDelete) => {
    if (googleKey) {
      initLoad({ waitAction: true });
      return DeleteIncome(googleKey, input).finally(() => {
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
  const onEditIncome = async (input: IIncomeEditInput) => {
    if (googleKey) {
      initLoad({ waitAction: true });
      return EditIncome(googleKey, input).finally(() => {
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

  //Setting
  const [openSetting, setSetting] = useState<boolean>(false);

  const getData = async (url?: string, version?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    if (key) {
      Get.getConfig(key, version);
      getIncomeSheets(undefined, key);
      Get.getTypes(key);
      await Get.getDuplecate(key);
      await Get.getDisplay(undefined, key);
      // initLoad({ fetch: false, dateChange: false });
    } else {
      Set.setGoogleKey("");
    }
  };

  useEffect(() => {
    initLoad({ fetch: true, waitAction: true });
    localLoad().then((url) => {
      if (!incomes.fetched) {
        getData(url.getUrl ?? undefined, url.version ?? undefined);
      }
    });
  }, []);

  useEffect(() => {
    initLoad({ fetch: true, waitAction: true });
    setIncomes({ fetched: false, income: [] });
    const timeer = setTimeout(() => {
      getIncomeSheets(dateSelect);
      if (dateTemp.getMonth() !== dateSelect.getMonth()) {
        Get.getDisplay(dateSelect);
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
          const res = setLocal("google_sheets", e.google_sheets);
          if (res) {
            window.location.reload();
          }
        }}
        onChangeWallpaper={(url) => {
          const res = setLocal("wallpaper", url ?? "");
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
        onClickSetting={() => {
          setSetting(true);
        }}
        master={{
          dupOfMonth: Facility.autoSelect,
          typesOfItems: Master.category,
          IGetDisplayCal: Facility.analytics,
        }}
        dateSelect={dateSelect}
        onAddIncome={onAddIncome}
        deleteIncome={onDeleteIncome}
        onSelectDate={setDateSelect}
        onEditIncome={onEditIncome}
        incomes={incomes.income}
        loading={loading}
        version={version}
      ></IncomeListInDay>
    </div>
  );
}
