interface UIMapingIncome {
  delete: boolean;
  fetching: boolean;
  draft: boolean;
  _priceType?: priceType;
}

interface IIncome extends UIMapingIncome {
  sheetsIndex: number;
  day: number;
  types: string;
  name: string;
  expensesCount: number | string;
  expensesPrice: number | string;
  revenueCount: number | string;
  revenuePrice: number | string;
}

type priceType = "Expenses" | "Revenue";

interface IncomeOfDay {
  day: number;
  income: IIncome[];
}

interface IIncomeAdd extends IIncome {}
interface IIncomeDelete {
  sheetsIndex: number;
}


interface IActionDayIncomesLists {
  onUpdate: (
    action: "add" | "update" | "delete",
    element: IIncome
  ) => Promise<IIncome | undefined>;
  setDelete: (indexOfDay: number) => IIncome | undefined;
  setAdd: (indexUpdated: number, income: IIncome) => void;
}
