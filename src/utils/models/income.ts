export class IncomeModel implements IIncome {
  sheetsIndex: number;
  day: Date;
  types: string;
  name: string;
  expensesCount: number | string;
  expensesPrice: number | string;
  revenueCount: number | string;
  revenuePrice: number | string;
  _priceType: priceType = "Expenses";
  delete: boolean = false;
  fetching: boolean = false;
  draft: boolean = false;
  indexOfList: number = 0;
  comment: string;

  public constructor(
    sheetsIndex: number,
    indexOfList: number,
    day: Date,
    types: string,
    name: string,
    expensesCount: number | string,
    expensesPrice: number | string,
    revenueCount: number | string,
    revenuePrice: number | string,
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
