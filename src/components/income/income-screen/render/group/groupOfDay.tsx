import React, { useEffect, useLayoutEffect, useState } from "react";
import IncomeElement from "../../../income-element/element";

interface IncomeGroupOfDayProps {
  incomeOfday: IIncome[] | "load" | null;
  date: Date;
  IncomeTypesOptions: RadioOptions[];
  actionApi: IActionDayIncomesLists;
}

const IncomeGroupOfDay: React.FC<IncomeGroupOfDayProps> = ({
  incomeOfday = [],
  date,
  IncomeTypesOptions,
  actionApi,
}) => {
  const [IncomeOfDayTemp, setIncomeOfDayTemp] = useState<IIncome[]>();
  useEffect(() => {
    if (incomeOfday && typeof incomeOfday !== "string") {
      setIncomeOfDayTemp(incomeOfday);
    }
  }, [incomeOfday]);

  // if (dayIndex - 1 < date.getDate())
  return (
    <div className="flex flex-col-reverse transition-all duration-300 p-4">
      {IncomeOfDayTemp?.length == 0 && (
        <div className="h-20 flex justify-center items-center text-gray-300 text-sm">
          ไม่มีข้อมูล
        </div>
      )}
      {IncomeOfDayTemp?.map((im, jindex) => {
        return (
          <div key={`incom-${date.getDate()}-${jindex}`}>
            {im ? (
              <IncomeElement
                IncomeTypesOptions={IncomeTypesOptions}
                itemIndex={jindex}
                actionApi={actionApi}
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
