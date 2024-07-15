export class IncomeModel implements IIncome {
  sheetsIndex: number;
  day: Date;
  types: string;
  name: string;
  expensesCount: number;
  expensesPrice: number;
  revenueCount: number;
  revenuePrice: number;
  _priceType: priceType = "Expenses";
  delete: boolean = false;
  fetching: boolean = false;
  draft: boolean = false;
  edit: boolean = false;
  indexOfList: number = 0;
  comment: string;

  public constructor(
    sheetsIndex: number,
    indexOfList: number,
    day: Date,
    types: string,
    name: string,
    expensesCount: number,
    expensesPrice: number,
    revenueCount: number,
    revenuePrice: number,
    comment: string
  ) {
    this.sheetsIndex = sheetsIndex;
    this.indexOfList = indexOfList;
    this.day = day;
    this.types = types;
    this.name = name;
    this.expensesCount = expensesCount;
    this.expensesPrice = expensesPrice;
    this.revenueCount = revenueCount;
    this.revenuePrice = revenuePrice;
    this.comment = comment;

    if (expensesCount) {
      this._priceType = "Expenses";
    } else {
      this._priceType = "Revenue";
    }
  }

  public getIncome(): IIncome {
    return {
      draft: this.draft,
      fetching: this.fetching,
      sheetsIndex: this.sheetsIndex,
      day: this.day,
      types: this.types,
      name: this.name,
      edit: this.edit,
      expensesCount: this.expensesCount,
      expensesPrice: this.expensesPrice,
      revenueCount: this.revenueCount,
      revenuePrice: this.revenuePrice,
      _priceType: this._priceType,
      delete: this.delete,
      indexOfList: this.indexOfList,
      comment: this.comment,
    };
  }
}

class LocalIncomeList {
  list = new Map<Date, LocalIncome>();
  constructor() {}

  getIncomeByDate(date: Date) {
    return this.list.get(date);
  }
}

class LocalIncome {
  date: Date | undefined;
  income: IIncome[] = [];
  constructor() {}

  getIncome() {
    return this.income;
  }

  pushIncome(income: IIncome) {
    this.income.push(income);
  }
}
