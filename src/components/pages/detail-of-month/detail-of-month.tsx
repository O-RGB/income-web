import CalendarCommon from "@/components/common/calendar";
import { DateFormat } from "@/libs/date-lib";
import React, { useEffect, useState } from "react";
import { MdCalendarMonth } from "react-icons/md";

interface DetailOfMonthProps {
  incomes?: IIncome[];
  onDateChange?: (date: Date) => void;
  date: Date;
  master: IMasterDataImcomes;
}

const DetailOfMonth: React.FC<DetailOfMonthProps> = ({
  incomes,
  onDateChange,
  date,
  master,
}) => {
  const [openDate, setOpenDate] = useState<boolean>(false);

  useEffect(() => {
    //   if (incomes) {
    //     console.log("incomes = ", incomes);
    //     const date = DateFormat();
    //     setT(date);
    //     let ex: number = 0;
    //     let re: number = 0;
    //     incomes?.map((income) => {
    //       if (Number(income.expensesPrice)) {
    //         ex = ex + Number(income.expensesPrice);
    //       }
    //       if (Number(income.revenuePrice)) {
    //         re = re + Number(income.revenuePrice);
    //       }
    //       // income.map((onDay) => {
    //       //   if (Number(onDay.expensesPrice)) {
    //       //     ex = ex + Number(onDay.expensesPrice);
    //       //   }
    //       //   if (Number(onDay.revenuePrice)) {
    //       //     re = re + Number(onDay.revenuePrice);
    //       //   }
    //       // });
    //     });
    //     setPriceSummary({
    //       Expenses: ex,
    //       Revenue: re,
    //     });
    //   }
  }, [incomes]);
  return (
    <>
      <div className="flex flex-col gap-3">
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
          <CalendarCommon
            sumLists={master.IGetDisplayCal?.calendar}
            onDateChange={onDateChange}
          ></CalendarCommon>
        </div>
      </div>
    </>
  );
};

export default DetailOfMonth;
