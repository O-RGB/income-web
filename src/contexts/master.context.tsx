"use client";
import CheckForUpdate from "@/components/modals/check-updated";
import Login from "@/components/modals/login";
import {
  addIncomesLocal,
  removeIncomesLocal,
  updateIncomesLocal,
} from "@/database/incomes";

import { FetchConfig } from "@/fetcher/GET/config.fetch";
import {
  FetchGetDisplayCal,
  FetchGetDupOfMonth,
} from "@/fetcher/GET/incomes.fetch";
import { FetchTypesIncome } from "@/fetcher/GET/types.fetch";
import {
  AddIncomesList,
  DeleteIncome,
  EditIncome,
  MoveIncome,
} from "@/fetcher/POST/incomes.post";
import { GenOption } from "@/libs/gen-options";
import { setLocal } from "@/libs/local";
import { ConfigList } from "@/utils/models/config";
import { IconsModelList } from "@/utils/models/icons";
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
    initLoad: (load: LoadType) => void;
    loading: ILoading;
  };
  Get: {
    getTypes: (url?: string) => Promise<void>;
    getDuplecate: (url?: string) => Promise<void>;
    getDisplay: (date?: Date, url?: string) => Promise<void>;
    getConfig: (url?: string, version?: string) => Promise<void>;
  };
  Set: {
    setGoogleKey: (key: string) => void;
    setDateSelected: (date: Date) => void;
    addIncome: (
      income: IIncome[]
    ) => Promise<IGeneralReturnFetch<IIncome[] | undefined>>;
    deleteIncome: (
      input: IIncomeDelete
    ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
    editIncome: (
      input: IIncomeEditInput
    ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
    moveIncome: (
      input: IIncomeMoveInput
    ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
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
    initLoad: async () => {},
    loading: {},
  },
  Get: {
    getTypes: async () => {},
    getDuplecate: async () => {},
    getDisplay: async () => {},
    getConfig: async () => {},
  },
  Set: {
    setGoogleKey: () => {},
    setDateSelected: () => {},
    addIncome: async () => ({}),
    deleteIncome: async () => ({}),
    editIncome: async () => ({}),
    moveIncome: async () => ({}),
  },
});

export const MasterProvider: FC<MasterProviderProps> = ({ children }) => {
  const [googleKey, setGoogleKey] = useState<string>();
  const [dateSelected, setDateSelected] = useState<Date>();
  const [config, setConfig] = useState<ConfigList>();
  const [isVersionOld, setVersionOld] = useState<boolean>(false);
  const [duplicateItems, setDuplicate] = useState<RadioOptions[]>([]);
  const [displayCal, setDisplayCal] = useState<IGetDisplayCal>();
  const [IncomeTypesOptions, setIncomeTypesOptions] = useState<IIncomeTypes[]>(
    []
  );
  const [updateing, setUpdateing] = useState<boolean>(false);
  const [iconModel, setIconModel] = useState<IconsModelList>();

  const [loading, setLoading] = useState<ILoading>({
    pageLoad: true,
    waitActioning: false,
  });

  const initLoad = ({ fetch, waitAction, dateChange }: LoadType) => {
    setLoading({
      pageLoad: fetch ? true : false,
      waitActioning: waitAction ? true : false,
      dateChange: dateChange ? true : false,
    });
  };

  const createIconsModel = () => {
    setIconModel(new IconsModelList());
  };

  const addIncome = async (income: IIncome[]) => {
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
  const deleteIncome = async (input: IIncomeDelete) => {
    if (googleKey) {
      initLoad({ waitAction: true });
      return DeleteIncome(googleKey, input).finally(() => {
        if (dateSelected) {
          removeIncomesLocal(input.sheetsIndex, dateSelected);
        }
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
  const editIncome = async (input: IIncomeEditInput) => {
    if (googleKey) {
      initLoad({ waitAction: true });
      return EditIncome(googleKey, input).finally(() => {
        if (dateSelected) {
          updateIncomesLocal(input.newIncome[0], dateSelected);
        }
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
  const moveIncome = async (input: IIncomeMoveInput) => {
    if (googleKey) {
      initLoad({ waitAction: true });
      return MoveIncome(googleKey, input).finally(() => {
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
          initLoad: initLoad,
          loading: loading,
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
          setDateSelected: setDateSelected,
          addIncome: addIncome,
          deleteIncome: deleteIncome,
          editIncome: editIncome,
          moveIncome: moveIncome,
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
