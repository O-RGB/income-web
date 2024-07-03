"use client";
import GoogleSheetsUrl from "@/components/form/google-sheets-url";
import SettingModal from "@/components/modals/setting";
import IncomeListInDay from "@/components/pages/home/income";

import { MasterContext } from "@/contexts/master.context";
import { FetchGetOfDay } from "@/fetcher/GET/incomes.fetch";
import { AddIncomesList, DeleteIncome } from "@/fetcher/POST/incomes.post";
import { getLocalByKey, setLocal } from "@/libs/local";
import { Modal } from "antd";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { Get, Master, Set, googleKey, Facility } = useContext(MasterContext);
  const [wallpaper, setWallpaper] = useState<string>("");
  const [version, setVersion] = useState<string>();

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
      initLoad({ fetch: true });
      await FetchGetOfDay(key, date ? date : new Date())
        .then((incomes) => {
          if (incomes) {
            setIncomes({
              fetched: true,
              income: incomes,
            });
          }
        })
        .catch((e) => {
          setIncomes({
            fetched: false,
            income: [],
          });
        })
        .finally(() => {
          setTimeout(() => {
            initLoad({ fetch: false, waitAction: false });
          }, 100);
        });
    } else {
      setIncomes({
        fetched: false,
        income: [],
      });
    }
  };

  const onAddIncome = async (income: IIncome[]) => {
    if (googleKey) {
      initLoad({ waitAction: true });
      return AddIncomesList(googleKey, { incomes: income }).finally(() => {
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

  //Setting
  const [openSetting, setSetting] = useState<boolean>(false);

  const getData = async (url?: string, version?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    if (key) {
      getIncomeSheets(undefined, key);
      Get.getTypes(key);
      await Get.getDuplecate(key);
      await Get.getDisplay(undefined, key);
      await Get.getConfig(key, version);
      initLoad({ fetch: false, dateChange: false });
    } else {
      Set.setGoogleKey("");
    }
  };

  useEffect(() => {
    initLoad({ fetch: true });
    localLoad().then((url) => {
      if (!incomes.fetched) {
        getData(url.getUrl ?? undefined, url.version ?? undefined);
      }
    });
  }, []);

  useEffect(() => {
    initLoad({ fetch: true, dateChange: true });
    const timeer = setTimeout(() => {
      setIncomes({ fetched: false, income: [] });
      Get.getDisplay(dateSelect);
      getIncomeSheets(dateSelect);
    }, 1000);

    return () => {
      clearInterval(timeer);
    };
  }, [dateSelect]);

  return (
    <div className="relative min-h-screen">
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
        incomes={incomes.income}
        loading={loading}
        version={version}
      ></IncomeListInDay>
    </div>
  );
}
