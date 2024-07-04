"use client";
import CheckForUpdate from "@/components/modals/check-updated";
import Login from "@/components/modals/login";
import { FetchConfig } from "@/fetcher/GET/config.fetch";
import {
  FetchGetDisplayCal,
  FetchGetDupOfMonth,
} from "@/fetcher/GET/incomes.fetch";
import { FetchTypesIncome } from "@/fetcher/GET/types.fetch";
import { GenOption } from "@/libs/gen-options";
import { getLocalByKey, setLocal } from "@/libs/local";
import { ConfigList } from "@/utils/models/config";
import { IconsModelList } from "@/utils/models/icons";
import { Button, Modal } from "antd";
import { createContext, FC, useEffect, useState } from "react";

type MasterContextType = {
  googleKey: string | undefined;
  Master: {
    category: IIncomeTypes[];
    config: ConfigList | undefined;
  };
  Facility: {
    autoSelect: RadioOptions[];
    analytics: IGetDisplayCal | undefined;
    iconModel: IconsModelList | undefined;
  };
  Get: {
    getTypes: (url?: string) => Promise<void>;
    getDuplecate: (url?: string) => Promise<void>;
    getDisplay: (date?: Date, url?: string) => Promise<void>;
    getConfig: (url?: string, version?: string) => Promise<void>;
  };
  Set: {
    setGoogleKey: (key: string) => void;
  };
};

type MasterProviderProps = {
  children: React.ReactNode;
};

export const MasterContext = createContext<MasterContextType>({
  googleKey: undefined,
  Master: {
    category: [],
    config: undefined,
  },
  Facility: {
    analytics: undefined,
    autoSelect: [],
    iconModel: new IconsModelList(),
  },
  Get: {
    getTypes: async () => {},
    getDuplecate: async () => {},
    getDisplay: async () => {},
    getConfig: async () => {},
  },
  Set: {
    setGoogleKey: () => {},
  },
});

export const MasterProvider: FC<MasterProviderProps> = ({ children }) => {
  const [googleKey, setGoogleKey] = useState<string>();
  const [config, setConfig] = useState<ConfigList>();
  const [version, setVersion] = useState<string>();
  const [isVersionOld, setVersionOld] = useState<boolean>(false);
  const [duplicateItems, setDuplicate] = useState<RadioOptions[]>([]);
  const [displayCal, setDisplayCal] = useState<IGetDisplayCal>();
  const [IncomeTypesOptions, setIncomeTypesOptions] = useState<IIncomeTypes[]>(
    []
  );
  const [updateing, setUpdateing] = useState<boolean>(false);
  const [iconModel, setIconModel] = useState<IconsModelList>();
  const createIconsModel = () => {
    setIconModel(new IconsModelList());
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

  const updateWebVersion = async () => {
    setUpdateing(false);
    if (config) {
      const version = config.getValueByName("version");
      const new_sheets = config.getValueByName("gg_key");
      if (version?.value && new_sheets?.value) {
        const res_v = setLocal("version", version.value);
        const res_g = setLocal("google_sheets", new_sheets.value);
        setUpdateing(true);
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    createIconsModel();
  }, []);

  return (
    <MasterContext.Provider
      value={{
        googleKey: googleKey,
        Facility: {
          iconModel: iconModel,
          analytics: displayCal,
          autoSelect: duplicateItems,
        },
        Get: {
          getTypes: getTypes,
          getConfig: getConfig,
          getDisplay: getDisplay,
          getDuplecate: getDuplecate,
        },
        Master: {
          category: IncomeTypesOptions,
          config: config,
        },
        Set: {
          setGoogleKey: setGoogleKey,
        },
      }}
    >
      <>
        <CheckForUpdate
          verionsConfig={config?.config}
          isVersionOld={isVersionOld}
          loading={updateing}
          onClickUpdate={updateWebVersion}
        ></CheckForUpdate>
        <Login googleKey={googleKey}></Login>

        {children}
      </>
    </MasterContext.Provider>
  );
};
