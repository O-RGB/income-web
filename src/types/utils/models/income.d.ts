interface IIncome {
  // indexSheets: number;
  day: number;
  types: string;
  name: string;
  expensesCount: number | string;
  expensesPrice: number | string;
  revenueCount: number | string;
  revenuePrice: number | string;
  _priceType: priceType;
}

type priceType = "Expenses" | "Revenue";

interface IncomeOfDay {
  day: number;
  income: IIncome[];
}
