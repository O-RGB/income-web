import React, { useEffect, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import TagSummary from "./tag-sumamry";

interface SummaryOfDayProps {
  incomeOfday: IIncome[];
  date: Date; // dateNow
}

const SummaryOfDay: React.FC<SummaryOfDayProps> = ({ incomeOfday, date }) => {
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
        if (data.delete !== true) {
          if (data.expensesPrice > 0) {
            ex = ex + data.expensesPrice;
          } else if (data.revenuePrice > 0) {
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
      <TagSummary
        color="bg-white/70"
        price={incomeOfday !== undefined ? summaryData.Expenses : 0}
        icon={<TiArrowSortedDown className="text-red-500"></TiArrowSortedDown>}
        title="รายจ่าย"
        iconColor="text-red-500"
      ></TagSummary>
      <TagSummary
        color="bg-white/70"
        price={incomeOfday !== null ? summaryData.Revenue : 0}
        title="รายรับ"
        icon={<TiArrowSortedUp className="text-green-500"></TiArrowSortedUp>}
        iconColor="text-green-500"
      ></TagSummary>
    </>
  );
};

export default SummaryOfDay;
