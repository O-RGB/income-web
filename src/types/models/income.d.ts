interface UIMapingIncome {
  delete: boolean;
  fetching: boolean;
  draft: boolean;
  _priceType?: priceType;
  indexOfList: number;
}

interface IncomeFormInput {
  name: string;
  price: string;
  types: string;
  count: string;
  priceType: "Expenses" | "Revenue"; // assuming priceType can be either 'Expenses' or 'Revenue'
  indexOfList: number;
}

interface IIncome extends UIMapingIncome {
  sheetsIndex: number;
  day: Date;
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
interface IIncomesListAdd {
  incomes: IIncome[];
}
interface IIncomeDelete {
  sheetsIndex: number;
}
