import CalendarCommon from "@/components/common/calendar";
import { DateFormat } from "@/libs/date-lib";
import React, { useEffect, useState } from "react";
import { MdCalendarMonth } from "react-icons/md";

interface DetailOfMonthProps {
  incomes?: IIncome[];
  onDateChange?: (date: Date) => void;
  date: Date;
}

const DetailOfMonth: React.FC<DetailOfMonthProps> = ({
  incomes,
  onDateChange,
  date,
}) => {
  const [test, setT] = useState<string>();
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [priceSummary, setPriceSummary] = useState<{
    Expenses: number;
    Revenue: number;
  }>({
    Expenses: 0,
    Revenue: 0,
  });
  useEffect(() => {
    if (incomes) {
      console.log("incomes = ", incomes);
      const date = DateFormat();
      setT(date);
      let ex: number = 0;
      let re: number = 0;
      incomes?.map((income) => {
        if (Number(income.expensesPrice)) {
          ex = ex + Number(income.expensesPrice);
        }
        if (Number(income.revenuePrice)) {
          re = re + Number(income.revenuePrice);
        }
        // income.map((onDay) => {
        //   if (Number(onDay.expensesPrice)) {
        //     ex = ex + Number(onDay.expensesPrice);
        //   }
        //   if (Number(onDay.revenuePrice)) {
        //     re = re + Number(onDay.revenuePrice);
        //   }
        // });
      });
      setPriceSummary({
        Expenses: ex,
        Revenue: re,
      });
    }
  }, [incomes]);
  return (
    <>
      <div className="p-2 flex flex-col gap-3">
        <div className=" flex justify-between pt-5">
          <div className="text-4xl">{DateFormat(date)}</div>
          <div
            onClick={() => {
              setOpenDate(!openDate);
            }}
            className="p-3 rounded-md  border cursor-pointer bg-blue-500 hover:bg-slate-300 text-white duration-300"
          >
            <MdCalendarMonth />
          </div>
        </div>
        <div
          className={`${
            openDate ? "max-h-[400px]" : "max-h-0 overflow-hidden"
          } transition-all duration-300`}
        >
          <CalendarCommon onDateChange={onDateChange}></CalendarCommon>
        </div>
        {/* <div className="flex  gap-3">
          <div className="border p-4 bg-slate-200 rounded-md">
            <div>รายจ่ายเดือนนี้ </div>
            <div className="text-2xl">{priceSummary.Expenses}</div>
          </div>
          <div className="border p-4 bg-slate-200 rounded-md">
            <div>รายรับเดือนนี้ </div>
            <div className="text-2xl">{priceSummary.Revenue}</div>
          </div>
        </div> */}
        <div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default DetailOfMonth;
