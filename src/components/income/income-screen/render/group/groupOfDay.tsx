import React, { useEffect, useLayoutEffect, useState } from "react";
import IncomeElement from "../../../income-element/element";

interface IncomeGroupOfDayProps {
  incomeOfday: IIncome[] | "load" | null;
  dayIndex: number;
  date: Date;
  onUpdate: (
    action: "add" | "update" | "delete",
    element: IIncome
  ) => Promise<IIncome | undefined>;
  setDelete: (indexOfDay: number) => IIncome | undefined;
  IncomeTypesOptions: RadioOptions[];
}

const IncomeGroupOfDay: React.FC<IncomeGroupOfDayProps> = ({
  incomeOfday = [],
  dayIndex,
  date,
  onUpdate,
  setDelete,
  IncomeTypesOptions,
}) => {
  const [IncomeOfDayTemp, setIncomeOfDayTemp] = useState<IIncome[]>();
  useEffect(() => {
    if (incomeOfday && typeof incomeOfday !== "string") {
      setIncomeOfDayTemp(incomeOfday);
    }
  }, [incomeOfday]);

  if (dayIndex - 1 < date.getDate())
    return (
      <div className="flex flex-col-reverse transition-all duration-300 p-4">
        {IncomeOfDayTemp?.map((im, jindex) => {
          return (
            <div key={`incom-${dayIndex}-${jindex}`}>
              {im ? (
                <IncomeElement
                  IncomeTypesOptions={IncomeTypesOptions}
                  indexOfDay={jindex}
                  setDelete={setDelete}
                  onUpdate={onUpdate}
                  income={im}
                ></IncomeElement>
              ) : (
                <>No data</>
              )}
            </div>
          );
        })}
      </div>
    );
};

export default IncomeGroupOfDay;
