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
  types: IIncomeTypes | string;
  count: string;
  priceType: "Expenses" | "Revenue"; // assuming priceType can be either 'Expenses' or 'Revenue'
  indexOfList: number;
  comment: string;
}

interface IIncome extends UIMapingIncome {
  sheetsIndex: number;
  day: Date;
  types: string;
  name: string;
  expensesCount: number;
  expensesPrice: number;
  revenueCount: number;
  revenuePrice: number;
  comment: string;
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
  sheetsName?: "TYPE";
  sheetsIndex: number;
}
