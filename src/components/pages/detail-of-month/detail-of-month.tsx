import CalendarCommon from "@/components/common/calendar";
import { DateFormat } from "@/libs/date-lib";
import React, { useEffect, useState } from "react";

interface DetailOfMonthProps {
  incomes?: IIncome[][];
  onDateChange?: (date: Date) => void;
}

const DetailOfMonth: React.FC<DetailOfMonthProps> = ({
  incomes,
  onDateChange,
}) => {
  const [test, setT] = useState<string>();
  const [priceSummary, setPriceSummary] = useState<{
    Expenses: number;
    Revenue: number;
  }>({
    Expenses: 0,
    Revenue: 0,
  });
  useEffect(() => {
    const date = DateFormat();
    setT(date);

    let ex: number = 0;
    let re: number = 0;
    incomes?.map((income) => {
      income.map((onDay) => {
        if (Number(onDay.expensesPrice)) {
          ex = ex + Number(onDay.expensesPrice);
        }
        if (Number(onDay.revenuePrice)) {
          re = re + Number(onDay.revenuePrice);
        }
      });
    });
    setPriceSummary({
      Expenses: ex,
      Revenue: re,
    });
  }, [incomes]);
  return (
    <>
      <div className="p-2 flex flex-col gap-3">
        <div className="text-4xl">{test}</div>
        <CalendarCommon onDateChange={onDateChange}></CalendarCommon>
        <div className="flex  gap-3">
          <div className="border p-4 bg-slate-200 rounded-md">
            <div>รายจ่ายเดือนนี้ </div>
            <div className="text-2xl">{priceSummary.Expenses}</div>
          </div>
          <div className="border p-4 bg-slate-200 rounded-md">
            <div>รายรับเดือนนี้ </div>
            <div className="text-2xl">{priceSummary.Revenue}</div>
          </div>
        </div>
        <div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default DetailOfMonth;
