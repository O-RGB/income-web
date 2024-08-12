interface ICMaster {
  category: IIncomeTypes[];
  config: ConfigList | undefined;
}

interface ICFacility {
  autoSelect: RadioOptions[];
  analytics: IGetDisplayCal | undefined;
  iconModel: IconsModelList | undefined;
  initLoad: (load: LoadType) => void;
  loading: ILoading;
  dateSelected: Date;
}

interface ICGet {
  getTypes: (
    url?: string,
    setting?: {
      local?: boolean;
    }
  ) => Promise<void>;
  getDuplecate: (API_KEY?: string) => Promise<void>;
  getDisplay: (API_KEY?: string, date?: Date) => Promise<void>;
  getConfig: (API_KEY?: string, version?: string) => Promise<void>;
  getIncomeByTypeId: (typeId: string) => Promise<Map<string, IncomeModel[]> | undefined>
}

type IServerReturn<T> = Promise<IGeneralReturnFetch<T | undefined>>;

interface ICSet {
  setGoogleKey: (API_KEY: string) => void;
  setDateSelected: (date: Date) => void;
  addIncome: (income: IIncome[]) => IServerReturn<IIncome[]>;
  deleteIncome: (input: IIncomeDelete) => IServerReturn<boolean>;
  editIncome: (input: IIncomeEditInput) => IServerReturn<boolean>;
  moveIncome: (input: IIncomeMoveInput) => IServerReturn<boolean>;
}
