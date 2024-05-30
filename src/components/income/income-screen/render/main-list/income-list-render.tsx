import React, { useEffect, useState } from "react";
import IncomeGroupOfDay from "../group/groupOfDay";
import DayHeader from "../header/dayHeader";
import SummaryOfDay from "../summary/summaryOfDay";

interface IncomeRenderProps {
  incomeOfday: IIncome[];
  dayIndex: number;
  date: Date;
  onUpdate: (
    action: "add" | "update" | "delete",
    element: IIncome
  ) => Promise<boolean>;
}

const IncomeRender: React.FC<IncomeRenderProps> = ({
  date,
  dayIndex,
  incomeOfday = [],
  onUpdate,
}) => {
  const [IncomeOfDay, setIncomeOfDay] = useState<IIncome[] | "load" | null>(
    incomeOfday
  );
  const cnageDate10 = () => {
    if (IncomeOfDay !== "load") {
      let clone = IncomeOfDay;
      setIncomeOfDay("load");
      clone?.push({
        _priceType: "Expenses",
        day: dayIndex,
        expensesCount: 1,
        expensesPrice: 1000,
        name: "ทดสอบ",
        revenueCount: 0,
        revenuePrice: 0,
        types: "",
      });
      setTimeout(() => {
        setIncomeOfDay(clone);
      }, 1000);
    }
  };
  useEffect(() => {}, [incomeOfday]);
  return (
    <>
      <div className="flex flex-col" key={`incom-day-${dayIndex}`}>
        <DayHeader date={date} dayIndex={dayIndex}></DayHeader>
        <div onClick={cnageDate10}>
          <div className="w-full flex justify-center items-center p-2">
            <div className="p-2 border rounded-lg cursor-pointer bg-blue-500 select-none text-white">
              เพิ่มข้อมูลวันที่ {dayIndex}
            </div>
          </div>
        </div>
        <IncomeGroupOfDay
          onUpdate={onUpdate}
          date={date}
          dayIndex={dayIndex}
          incomeOfday={IncomeOfDay}
        ></IncomeGroupOfDay>
        <SummaryOfDay
          date={date}
          dayIndex={dayIndex}
          incomeOfday={IncomeOfDay}
        ></SummaryOfDay>
      </div>
    </>
  );
};

export default IncomeRender;
