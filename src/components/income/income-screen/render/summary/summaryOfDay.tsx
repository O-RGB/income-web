import React, { useEffect, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import TagSummary from "./tag-sumamry";
import { AiFillStar } from "react-icons/ai";
import { setTimeout } from "timers";

interface SummaryOfDayProps {
  incomeOfday: IIncome[];
  dayIndex: number;
  date: Date; // dateNow
}

const SummaryOfDay: React.FC<SummaryOfDayProps> = ({
  incomeOfday,
  dayIndex,
  date,
}) => {
  const [_date, setDate] = useState(new Date());
  const [summaryData, setSummary] = useState<{
    Expenses: number;
    Revenue: number;
  }>({
    Expenses: 0,
    Revenue: 0,
  });
  const summary = () => {
    let ex: number = 0;
    let re: number = 0;
    if (incomeOfday) {
      incomeOfday?.map((data) => {
        console.log(data);
        if (data.delete !== true) {
          if (data.expensesPrice > 0) {
            console.log(data.name, data.expensesCount);
            ex = ex + data.expensesPrice;
          } else if (data.revenuePrice > 0) {
            console.log(data.name, data.revenuePrice);
            re = re + data.revenuePrice;
          }
        }
      });
      setSummary({
        Expenses: ex,
        Revenue: re,
      });
    }
  };
  useEffect(() => {
    if (incomeOfday.length > 0 || date !== _date) {
      summary();
    }
    setDate(date);
    // }
  }, [incomeOfday]);

  return (
    <>
      {/* {JSON.stringify(summaryData)} */}

      <TagSummary
        // loading={incomeOfday == "load"}
        color="bg-white/70"
        price={incomeOfday !== undefined ? summaryData.Expenses : 0}
        icon={<TiArrowSortedDown className="text-red-500"></TiArrowSortedDown>}
        title="รายจ่าย"
        iconColor="text-red-500"
      ></TagSummary>
      <TagSummary
        color="bg-white/70"
        // loading={incomeOfday}
        price={incomeOfday !== null ? summaryData.Revenue : 0}
        title="รายรับ"
        icon={<TiArrowSortedUp className="text-green-500"></TiArrowSortedUp>}
        iconColor="text-green-500"
      ></TagSummary>
      {/* <TagSummary
          // loading={incomeOfday == "load"}
          color="bg-blue-200"
          price={
            incomeOfday !== undefined
              ? summaryData.Expenses - summaryData.Revenue
              : 0
          }
          title="รายจ่ายสุทธิวันนี้"
          icon={<AiFillStar className="text-white"></AiFillStar>}
          iconColor="bg-blue-500"
        ></TagSummary> */}
    </>
  );
};

export default SummaryOfDay;
