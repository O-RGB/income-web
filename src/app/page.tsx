"use client";

import SettingModal from "@/components/modals/setting";
import IncomeListInDay from "@/components/pages/home/income";

import { MasterContext } from "@/contexts/master.context";
import { FetchGetOfDay } from "@/fetcher/GET/incomes.fetch";

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

  const getIncomeSheets = async (date?: Date, url?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    if (key) {
      // ยกเลิก fetch ก่อนหน้าถ้ามี
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      Facility.initLoad({ fetch: true, waitAction: true });
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
              Facility.initLoad({ fetch: false, waitAction: false });
            }, 100);
          }
        })
        .catch((e) => {
          console.log(e);
          setIncomes({
            fetched: true,
            income: [],
          });
        });
    } else {
      setIncomes({
        fetched: false,
        income: [],
      });
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
    } else {
      Set.setGoogleKey("");
    }
  };

  useEffect(() => {
    Facility.initLoad({ fetch: true, waitAction: true });
    localLoad().then((url) => {
      if (!incomes.fetched) {
        getData(url.getUrl ?? undefined, url.version ?? undefined);
      }
    });
  }, []);

  useEffect(() => {
    Facility.initLoad({ fetch: true, waitAction: true });
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
        onAddIncome={Set.addIncome}
        deleteIncome={Set.deleteIncome}
        onSelectDate={setDateSelect}
        onEditIncome={Set.editIncome}
        onMoveIncome={Set.moveIncome}
        incomes={incomes.income}
        loading={Facility.loading}
        version={version}
      ></IncomeListInDay>
    </div>
  );
}
