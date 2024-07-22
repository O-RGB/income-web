"use client";

import { createContext, FC, useEffect, useState } from "react";

type IncomesContextType = {
  Income: IIncome[] | undefined;
};

type IncomesProviderProps = {
  children: React.ReactNode;
};

export const IncomesContext = createContext<IncomesContextType>({
  Income: undefined,
});

export const IncomesProvider: FC<IncomesProviderProps> = ({ children }) => {
  const [Income, setIncome] = useState<IIncome[]>([]);
  const [firstIndexSheets, setFirstIndex] = useState<number>(0);

  // ON CLIENT

  const getDraft = () => {
    
  }


  // ON SERVER

  useEffect(() => {}, []);

  return (
    <IncomesContext.Provider
      value={{
        Income: Income,
      }}
    >
      <>{children}</>
    </IncomesContext.Provider>
  );
};
