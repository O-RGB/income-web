import React, { useEffect, useState } from "react";
import IncomeElement from "../../../income-element/element";

interface IncomeGroupOfDayProps {
  incomeOfday: IIncome[] | "load" | null;
  dayIndex: number;
  date: Date;
  onUpdate: (
    action: "add" | "update" | "delete",
    element: IIncome
  ) => Promise<boolean>;
}

const IncomeGroupOfDay: React.FC<IncomeGroupOfDayProps> = ({
  incomeOfday = [],
  dayIndex,
  date,
  onUpdate,
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
                <IncomeElement onUpdate={onUpdate} income={im}></IncomeElement>
              ) : (
                <>No data</>
              )}
            </div>
          );
        })}
      </div>
    );

  // return (
  //   <div className="flex flex-col-reverse transition-all duration-300">
  //     {dayIndex - 1 < date.getDate() && incomeOfday === null ? (
  //       <>
  //         <div className="text-center p-3 text-gray-300">ยังไม่มีข้อมูล</div>
  //       </>
  //     ) : incomeOfday === "load" ? (
  //       <>
  //         load
  //         <div className="flex flex-col-reverse">
  //           {IncomeOfDayTemp?.map((im, jindex) => {
  //             return (
  //               <div key={`incom-${dayIndex}-${jindex}`}>
  //                 {im ? (
  //                   <IncomeElement income={im}></IncomeElement>
  //                 ) : (
  //                   <>No data</>
  //                 )}
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </>
  //     ) : (
  //       <>
  //         real
  //         <div className="flex flex-col-reverse">
  //           {incomeOfday?.map((im, jindex) => {
  //             return (
  //               <div key={`incom-${dayIndex}-${jindex}`}>
  //                 {im ? (
  //                   <IncomeElement income={im}></IncomeElement>
  //                 ) : (
  //                   <>No data</>
  //                 )}
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
};

export default IncomeGroupOfDay;
