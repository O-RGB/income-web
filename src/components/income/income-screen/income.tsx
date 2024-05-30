import React from "react";
import DetailOfMonth from "@/components/pages/detail-of-month/detail-of-month";
import FloatingButton from "@/components/form-data/floating-button/floating-button";
import IncomeRender from "./render/main-list/income-list-render";

interface IncomeListInDayProps {
  incomes?: IIncome[][];
}

const IncomeListInDay: React.FC<IncomeListInDayProps> = ({ incomes }) => {
  const dateNow = new Date();

  const onElementUpdate = async (
    action: "add" | "update" | "delete",
    element: IIncome
  ) => {
    console.log(action, element);
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 1000);
    });
  };

  if (incomes === undefined) {
    return <>Google Sheets URL Error</>;
  }

  return (
    <>
      <FloatingButton></FloatingButton>
      <DetailOfMonth incomes={incomes}></DetailOfMonth>
      <div className="flex gap-10 flex-col-reverse">
        {incomes?.map((income, dayIndex) => {
          return (
            <React.Fragment key={`incomes-day-${dayIndex}`}>
              <IncomeRender
                onUpdate={onElementUpdate}
                incomeOfday={income}
                dayIndex={dayIndex + 1}
                date={dateNow}
              ></IncomeRender>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default IncomeListInDay;
