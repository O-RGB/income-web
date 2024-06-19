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
  IncomeTypesOptions: RadioOptions[],
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

  // var types: string = "";
  // // const nameType: RadioOptions | undefined = IncomeTypesOptions.find(
  // //   (x) => x.value === input.types
  // // );

  // if (nameType) {
  //   if (nameType.value == "T00") {
  //     types = "";
  //   } else {
  //     types = nameType.label ?? "";
  //   }
  // }

  const incomeData: IIncome = {
    day: day,
    delete: false,
    draft: false,
    name: input.name,
    fetching: true,
    sheetsIndex: sheetsIndex,
    indexOfList: input.indexOfList,
    ...expenses,
    ...revenue,
    types: input.types,
    _priceType: input.priceType,
    comment: input.comment,
  };

  return incomeData;
};
