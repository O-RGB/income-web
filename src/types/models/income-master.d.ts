interface IIncomeTypes {
  typeId: string;
  name: string;
  relationship?: string[];
}

interface IMasterDataImcomes {
  typesOfItems: RadioOptions[];
  dupOfMonth: RadioOptions[];
  IGetDisplayCal?: IGetDisplayCal;
}

interface IActionDayIncomesLists {
  setFetchingDraft: () => Promise<void>;
  setUpdate?: (indexUpdated: number, income: IIncome) => void;
  setAdd: (incomesList: IIncome[]) => Promise<
    {
      index: number;
      result: boolean;
    }[]
  >;
  setDraft?: () => void;
  setDelete?: (indexOfDay: number, listIndex: number) => void;
  setDeleteOnClient?: (indexOfDay: number) => void;
}

interface IGetDisplayCal {
  calendar: ICalenderList[];
  types: ITypesList[];
}

interface IPrice {
  revenue: number;
  expenses: number;
}

interface ICalenderList {
  day: number;
  value: IPrice;
}

interface ITypesList {
  type: string;
  plot: IDisplayPlotType[];
}

interface IDisplayPlotType extends IPrice {
  day: number;
}
