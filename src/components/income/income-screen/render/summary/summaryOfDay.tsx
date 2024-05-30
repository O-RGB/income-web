import React, { useEffect, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import TagSummary from "./tag-sumamry";
import { AiFillStar } from "react-icons/ai";
import { setTimeout } from "timers";

interface SummaryOfDayProps {
  incomeOfday: IIncome[] | "load" | null;
  dayIndex: number;
  date: Date; // dateNow
}

const SummaryOfDay: React.FC<SummaryOfDayProps> = ({
  incomeOfday,
  dayIndex,
  date,
}) => {
  // if (incomeOfday.length === 0) {
  //   return <></>;
  // }

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
    if (incomeOfday !== "load" && incomeOfday !== null) {
      incomeOfday?.map((data) => {
        if (data.expensesPrice !== "") {
          ex = ex + Number(data.expensesPrice);
        } else if (data.revenuePrice !== "") {
          re = re + Number(data.revenuePrice);
        }
      });
    }

    setSummary({
      Expenses: ex,
      Revenue: re,
    });
  };
  useEffect(() => {
    summary();
  }, [incomeOfday]);

  if (dayIndex - 1 < date.getDate())
    return (
      <div className="flex flex-col py-4 px-3 gap-1 bg-white">
        <div className="flex flex-col sm:flex-row gap-1 w-full">
          <TagSummary
            color="bg-green-200"
            loading={incomeOfday == "load"}
            price={
              incomeOfday !== "load" && incomeOfday !== null
                ? summaryData.Revenue
                : 0
            }
            title="รายรับ"
            icon={
              <TiArrowSortedDown className="text-white"></TiArrowSortedDown>
            }
            iconColor="bg-green-500"
          ></TagSummary>
          <TagSummary
            loading={incomeOfday == "load"}
            color="bg-red-200"
            price={
              incomeOfday !== "load" && incomeOfday !== null
                ? summaryData.Expenses
                : 0
            }
            title="รายจ่าย"
            icon={<TiArrowSortedUp className="text-white"></TiArrowSortedUp>}
            iconColor="bg-red-500"
          ></TagSummary>
          <TagSummary
            loading={incomeOfday == "load"}
            color="bg-blue-200"
            price={
              incomeOfday !== "load" && incomeOfday !== null
                ? summaryData.Expenses - summaryData.Revenue
                : 0
            }
            title="รายจ่ายสุทธิวันนี้"
            icon={<AiFillStar className="text-white"></AiFillStar>}
            iconColor="bg-blue-500"
          ></TagSummary>
        </div>
      </div>
    );
};

export default SummaryOfDay;
