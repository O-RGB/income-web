"use client";
import CheckForUpdate from "@/components/modals/check-updated";
import { createContext, FC, useEffect, useState } from "react";

type CalculatorContextType = {
  Income: IIncome[] | undefined;
  Price: number;
  addIncome: (income: IIncome) => void;
  removeIncome: (index: number) => void;
  calIncome: () => void;
  removeAll: () => void;
};

type CalculatorProviderProps = {
  children: React.ReactNode;
};

export const CalculatorContext = createContext<CalculatorContextType>({
  Income: undefined,
  Price: 0,
  addIncome: () => {},
  removeIncome: () => {},
  calIncome: () => {},
  removeAll: () => {},
});

export const CalculatorProvider: FC<CalculatorProviderProps> = ({
  children,
}) => {
  const [Income, setIncome] = useState<IIncome[]>([]);
  const [Price, setPrice] = useState<number>(0);

  const calPrice = (clone: IIncome[]) => {
    let pr = clone.map((x) => x.expensesPrice);
    let re = pr.length > 0 ? pr.reduce((t, x) => t + x) : 0;
    setPrice(re);
  };

  const addIncome = (income: IIncome) => {
    let clone = [...Income, income];
    setIncome(clone);
    calPrice(clone);
  };

  const removeIncome = (index: number) => {
    let clone = [...Income];
    clone = clone.filter((x, i) => x.sheetsIndex !== index);
    setIncome(clone);
    calPrice(clone);
  };

  const calIncome = () => {
    let clone = [...Income];
    calPrice(clone);
  };

  const removeAll = () => {
    setIncome([]);
    setPrice(0);
  };

  useEffect(() => {}, []);

  return (
    <CalculatorContext.Provider
      value={{
        Income: Income,
        Price: Price,
        addIncome: addIncome,
        removeIncome: removeIncome,
        calIncome: calIncome,
        removeAll: removeAll,
      }}
    >
      <>{children}</>
    </CalculatorContext.Provider>
  );
};
