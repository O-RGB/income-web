import React from "react";
import DetailOfMonth from "@/components/pages/detail-of-month/detail-of-month";
import FloatingButton from "@/components/form-data/floating-button/floating-button";
import IncomeRender from "./render/main-list/income-list-render";

interface IncomeListInDayProps {
  incomes?: IIncome[][];
  addIncome?: (
    income: IIncome
  ) => Promise<IGeneralReturnFetch<IIncome | undefined>>;
  deleteIncome?: (
    sheetsIndex: number
  ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
  stopFetch: boolean;
}

const IncomeListInDay: React.FC<IncomeListInDayProps> = ({
  incomes,
  addIncome,
  deleteIncome,
  stopFetch,
}) => {
  const dateNow = new Date();

  const onElementUpdate = async (
    action: "add" | "update" | "delete",
    element: IIncome
  ) => {
    if (stopFetch) {
      return undefined;
    }
    if (!deleteIncome || !addIncome) {
      return undefined;
    }

    try {
      switch (action) {
        case "add":
          return addIncome(element).then((data) => {
            if (data) {
              if (data.success) {
                element.fetching = false;
                return element;
              } else {
                return undefined;
              }
            } else {
              return undefined;
            }
          });

        case "delete":
          return deleteIncome(element.sheetsIndex).then((data) => {
            if (data) {
              if (data.success) {
                element.delete = true;
                return element;
              } else {
                return undefined;
              }
            } else {
              return undefined;
            }
          });

        default:
          return undefined;
      }
    } catch (error) {
      return undefined;
    }
  };

  if (incomes === undefined) {
    return <>Google Sheets URL Error</>;
  }

  return (
    <>
      <FloatingButton
        onClick={() => {
          onElementUpdate("add", {
            sheetsIndex: 1,
            day: dateNow.getDate(),
            expensesCount: 1,
            expensesPrice: 100,
            name: "ทดสอบเท่านั้น",
            types: "",
            revenueCount: "",
            revenuePrice: "",
            delete: false,
            fetching: true,
            draft: false,
          });
        }}
      ></FloatingButton>
      <DetailOfMonth incomes={incomes}></DetailOfMonth>
      <div className="flex gap-10 flex-col-reverse">
        {incomes?.map((income, dayIndex) => {
          return (
            <React.Fragment key={`incomes-day-${dayIndex}`}>
              <IncomeRender
                stopFetch={stopFetch}
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
