interface IIncomeTypes {
  rowIndex: number;
  typeId: string;
  name: string;
  color: string;
  icons: string;
}

interface IMasterDataImcomes {
  typesOfItems: IIncomeTypes[];
  dupOfMonth: RadioOptions[];
  IGetDisplayCal?: IGetDisplayCal;
}

interface IActionDayIncomesLists {
  setFetchingDraft: () => Promise<IIncome[]>;
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
  onSelectEdit?: (sheetsIndex: number, index: number) => void;
  onSaveEdit?: (sheetsIndex: number, index: number) => void;
  onExitEdit?: (index: number) => void;
  editSheetsIndexServer?: (income: IIncome[]) => Promise<void>;
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
  iconId: string;
  plot: IDisplayPlotType[];
}

interface IDisplayPlotType extends IPrice {
  day: number;
}

interface IConfigList {
  name: string;
  value: string;
}
