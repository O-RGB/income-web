type DynamicKeys<T> = {
  [K in keyof T as `${string & K}_${number}`]: T[K];
};

interface PathName extends DynamicKeys<IncomeFormInput> {}

export const DynamicKeysToArray = (obj: PathName): IncomeFormInput[] => {
  const grouped: { [key: string]: Partial<IncomeFormInput> } = {};

  const keys = Object.keys(obj) as Array<keyof typeof obj>;

  keys.map((key) => {
    const match = key.match(/(.*)_(\d+)$/);
    if (match) {
      const baseKey = match[1] as keyof IncomeFormInput;
      const index = match[2];
      if (!grouped[index]) {
        grouped[index] = {};
      }
      if (obj[key] !== undefined) {
        grouped[index][baseKey] = obj[key] as any;
      }
    }
  });
  console.log("grouped", grouped);
  const changed: IncomeFormInput[] = [];
  Object.keys(grouped).map((key) => {
    const entry = grouped[key];
    changed.push({
      name: entry.name ?? "",
      price: entry.price ?? "",
      types: entry.types ?? "",
      count: entry.count ?? "",
      priceType: entry.priceType ?? "Expenses",
      indexOfList: Number(key),
      comment: entry.comment ?? "",
    });
  });

  return changed;
};

export const hanndelInputIncome = (
  input: IncomeFormInput,
  day: Date,
  sheetsIndex: number = 0
) => {
  const expenses = {
    expensesCount: 0,
    expensesPrice: 0,
  };

  const revenue = {
    revenueCount: 0,
    revenuePrice: 0,
  };

  if (input.priceType == "Expenses") {
    expenses.expensesCount = Number(input.count);
    expenses.expensesPrice = Number(input.price);
  } else {
    revenue.revenueCount = Number(input.count);
    revenue.revenuePrice = Number(input.price);
  }

  const initType =
    typeof input.types === "string"
      ? input.types
      : (input.types as IIncomeTypes).typeId;

  const incomeData: IIncome = {
    day: day,
    delete: false,
    draft: false,
    name: input.name.trim(),
    fetching: true,
    sheetsIndex: sheetsIndex,
    indexOfList: input.indexOfList,
    ...expenses,
    ...revenue,
    types: initType.trim(),
    _priceType: input.priceType,
    comment: input.comment,
  };

  return incomeData;
};
