"use client";
import InputCommon from "@/components/common/input";
import GoogleSheetsUrl from "@/components/form/google-sheets-url";
import WallpaperForm from "@/components/form/wallpaper/wallpaper-form";
import IncomeListInDay from "@/components/income/income-screen/income";
import SettingModal from "@/components/setting/setting";
import {
  FetchGetDisplayCal,
  FetchGetDupOfMonth,
  FetchGetOfDay,
} from "@/fetcher/GET/incomes.fetch";
import { FetchTypesIncome } from "@/fetcher/GET/types.fetch";
import { AddIncomesList, DeleteIncome } from "@/fetcher/POST/incomes.post";
import { GenOption } from "@/libs/gen-options";
import { getLocalByKey, setLocal } from "@/libs/local";
import { Modal } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [googleKey, setGoogleKey] = useState<string | "">();
  const [wallpaper, setWallpaper] = useState<string>("");
  const [incomes, setIncomes] = useState<{
    fetched: boolean;
    income: IIncome[];
  }>({
    fetched: false,
    income: [],
  });
  const [loading, setLoading] = useState<ILoading>({
    pageLoad: false,
    waitActioning: false,
  });
  const [duplicateItems, setDuplicate] = useState<RadioOptions[]>([]);
  const [displayCal, setDisplayCal] = useState<IGetDisplayCal>();
  const [IncomeTypesOptions, setIncomeTypesOptions] = useState<IIncomeTypes[]>(
    []
  );
  const [dateSelect, setDateSelect] = useState<Date>(new Date());

  const localLoad = async () => {
    let getUrl = getLocalByKey("google_sheets");
    let wallpaper = getLocalByKey("wallpaper");
    if (getUrl) {
      setGoogleKey(getUrl);
    }
    if (wallpaper) {
      setWallpaper(wallpaper);
    }

    return getUrl;
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

  const getTypes = async (url?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    if (key) {
      const incomes = await FetchTypesIncome(key);
      if (incomes) {
        setIncomeTypesOptions(incomes);
      }
    }
  };

  const getDuplecate = async (url?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    if (key) {
      const incomes = await FetchGetDupOfMonth(key);
      if (incomes) {
        const convent = incomes.map((data) => {
          return { name: data, value: data };
        });
        const options = GenOption("name", "value", convent);
        setDuplicate(options);
      }
    }
  };

  const getDisplay = async (date: Date = new Date(), url?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    if (key) {
      const cal = await FetchGetDisplayCal(key, date);
      if (cal) {
        setDisplayCal(cal);
      }
    }
  };

  const getIncomeSheets = (date?: Date, url?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    if (key) {
      initLoad({ fetch: true });
      FetchGetOfDay(key, date ? date : new Date())
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
          initLoad({ fetch: false, waitAction: false });
        });
    } else {
      setIncomes({
        fetched: false,
        income: [],
      });
      initLoad({ fetch: false, waitAction: false });
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

  const getData = (url?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    console.log(key);
    if (key) {
      getIncomeSheets(undefined, key);
      getTypes(key);
      getDuplecate(key);
      getDisplay(undefined, key);
    } else {
      setGoogleKey("");
    }
  };

  useEffect(() => {
    localLoad().then((url) => {
      if (!incomes.fetched) {
        getData(url ?? undefined);
      }
    });
  }, []);

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
      <Modal
        title="ลงชื่อเข้าใช้ระบบ"
        closable={false}
        open={googleKey == ""}
        footer={<></>}
      >
        <GoogleSheetsUrl
          onFinish={(e) => {
            const res = setLocal("google_sheets", e.google_sheets);
            if (res) {
              window.location.reload();
            }
          }}
        ></GoogleSheetsUrl>
      </Modal>

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
          dupOfMonth: duplicateItems,
          typesOfItems: IncomeTypesOptions,
          IGetDisplayCal: displayCal,
        }}
        dateSelect={dateSelect}
        onAddIncome={onAddIncome}
        deleteIncome={onDeleteIncome}
        onSelectDate={onSelectDate}
        incomes={incomes.income}
        loading={loading}
      ></IncomeListInDay>
    </div>
  );
}
