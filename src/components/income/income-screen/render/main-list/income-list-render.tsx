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
  ) => Promise<IIncome | undefined>;
  stopFetch: boolean;
}

const IncomeRender: React.FC<IncomeRenderProps> = ({
  date,
  dayIndex,
  incomeOfday = [],
  onUpdate,
  stopFetch,
}) => {
  const [IncomeOfDay, setIncomeOfDay] = useState<IIncome[] | "load" | null>(
    incomeOfday
  );

  const setDelete = (indexOfDay: number) => {
    if (IncomeOfDay !== "load" && IncomeOfDay) {
      const clone = IncomeOfDay;
      setIncomeOfDay("load");

      let countDelete: number = 0;
      var newIncomeOfDay: IIncome[] = [];
      clone.map((income, index) => {
        if (income.delete) {
          countDelete = countDelete + 1;
        }

        newIncomeOfDay.push({
          ...income,
          sheetsIndex: index + 2 - countDelete,
        });
      });

      setTimeout(() => {
        setIncomeOfDay(newIncomeOfDay);
      }, 100);

      return newIncomeOfDay[indexOfDay];
      // }
    }
  };

  const findIndexNotDelete = () => {
    if (IncomeOfDay !== "load") {
      if (IncomeOfDay) {
        const notDelete = IncomeOfDay?.filter((data) => data.delete !== true);
        return notDelete.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const cnageDate10 = () => {
    if (IncomeOfDay !== "load") {
      let clone = IncomeOfDay;
      setIncomeOfDay("load");
      let newElement: IIncome = {
        sheetsIndex: findIndexNotDelete() + 2,
        _priceType: "Expenses",
        day: dayIndex,
        expensesCount: 1,
        expensesPrice: 1000,
        name: "ทดสอบ",
        revenueCount: 0,
        revenuePrice: 0,
        types: "",
        delete: false,
        fetching: true,
        draft: true,
      };

      //ส่งค่าไปทันที ถ้า Error แล้วค่อยตัด UI ออก
      // onUpdate("add", newElement);

      clone?.push(newElement);
      setTimeout(() => {
        setIncomeOfDay(clone);
      }, 1);
    }
  };
  useEffect(() => {}, [incomeOfday]);
  return (
    <>
      <div className="flex flex-col" key={`incom-day-${dayIndex}`}>
        <DayHeader date={date} dayIndex={dayIndex}></DayHeader>
        {dayIndex <= date.getDate() && (
          <div onClick={stopFetch == false ? cnageDate10 : () => {}}>
            <div className="w-full flex justify-center items-center p-2">
              <div className="p-2 border rounded-lg cursor-pointer bg-blue-500 select-none text-white">
                เพิ่มข้อมูลวันที่ {dayIndex}
              </div>
            </div>
          </div>
        )}
        <IncomeGroupOfDay
          setDelete={setDelete}
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
