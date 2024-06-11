interface IIncomeTypes {
  typeId: string;
  name: string;
  relationship?: string[];
}

interface IMasterDataImcomes {
  typesOfItems: RadioOptions[];
  dupOfMonth: RadioOptions[];
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
