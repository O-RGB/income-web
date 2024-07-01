"use client";
import InputCommon from "@/components/common/input";
import GoogleSheetsUrl from "@/components/form/google-sheets-url";
import WallpaperForm from "@/components/form/wallpaper/wallpaper-form";
import IncomeListInDay from "@/components/income/income-screen/income";
import SettingModal from "@/components/setting/setting";
import { FetchConfig } from "@/fetcher/GET/config.fetch";
import {
  FetchGetDisplayCal,
  FetchGetDupOfMonth,
  FetchGetOfDay,
} from "@/fetcher/GET/incomes.fetch";
import { FetchTypesIncome } from "@/fetcher/GET/types.fetch";
import { AddIncomesList, DeleteIncome } from "@/fetcher/POST/incomes.post";
import { GenOption } from "@/libs/gen-options";
import { getLocalByKey, setLocal } from "@/libs/local";
import { ConfigList } from "@/utils/models/config";
import { IconsModelList } from "@/utils/models/icons";
import { Button, Modal } from "antd";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

export default function Home() {
  const [googleKey, setGoogleKey] = useState<string | "">();
  const [wallpaper, setWallpaper] = useState<string>("");
  const [version, setVersion] = useState<string>();
  const [isVersionOld, setVersionOld] = useState<boolean>(false);
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
  const [duplicateItems, setDuplicate] = useState<RadioOptions[]>([]);
  const [displayCal, setDisplayCal] = useState<IGetDisplayCal>();
  const [IncomeTypesOptions, setIncomeTypesOptions] = useState<IIncomeTypes[]>(
    []
  );
  const [dateSelect, setDateSelect] = useState<Date>(new Date());
  const [config, setConfig] = useState<ConfigList>();
  const [iconModel, setIconModel] = useState<IconsModelList>(
    new IconsModelList()
  );

  const localLoad = async () => {
    let getUrl = getLocalByKey("google_sheets");
    let wallpaper = getLocalByKey("wallpaper");
    let version = getLocalByKey("version");
    if (getUrl) {
      setGoogleKey(getUrl);
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

  const getConfig = async (url?: string, version?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    if (key) {
      const config = await FetchConfig(key);
      if (config) {
        setConfig(config);
        const data = config.getValueByName("version");
        if (data) {
          if (data.value !== version) {
            setVersionOld(true);
          }
        }
      }
    }
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
  const [updateing, setUpdate] = useState<boolean>(false);

  const getData = async (url?: string, version?: string) => {
    const key = url ? url : googleKey !== "" ? googleKey : undefined;
    if (key) {
      getIncomeSheets(undefined, key);
      getTypes(key);
      await getDuplecate(key);
      await getDisplay(undefined, key);
      await getConfig(key, version);
      initLoad({ fetch: false, dateChange: false });
    } else {
      setGoogleKey("");
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
      getDisplay(dateSelect);
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

      <Modal
        title="ตรวจพบเวอร์ชันใหม่"
        closable={false}
        open={isVersionOld}
        footer={<></>}
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <img src="/update.png" className="w-20 h-20 " alt="" />
          <Button
            type="primary"
            loading={updateing}
            onClick={() => {
              if (config) {
                const version = config.getValueByName("version");
                const new_sheets = config.getValueByName("gg_key");
                if (version?.value && new_sheets?.value) {
                  setUpdate(true);
                  const res_v = setLocal("version", version.value);
                  const res_g = setLocal("google_sheets", new_sheets.value);
                  window.location.reload();
                }
              }
            }}
          >
            อัปเดต
          </Button>
        </div>
      </Modal>
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
        fetchNewType={getTypes}
        icons={iconModel}
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
        onSelectDate={setDateSelect}
        incomes={incomes.income}
        loading={loading}
        version={version}
      ></IncomeListInDay>
    </div>
  );
}
