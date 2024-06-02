import React, { useEffect, useState } from "react";
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
  IncomeTypesOptions: RadioOptions[];
  showOnlyDay?: number;
}

const IncomeListInDay: React.FC<IncomeListInDayProps> = ({
  incomes,
  addIncome,
  deleteIncome,
  stopFetch,
  IncomeTypesOptions,
  // showOnlyDay = 1,
}) => {
  const dateNow = new Date();

  const [incomesData, setIncomes] = useState<IIncome[][] | undefined>([]);
  const [dateSelect, setDateSelect] = useState<Date | undefined>();

  const updateIndexSheetsOnMonth = (dayIndex: number, income: IIncome[]) => {
    if (incomesData) {
      var clone = incomesData;
      // setIncomes([]);

      if (clone[dayIndex - 1]) {
        clone[dayIndex - 1] = income;

        var count: number = 2;
        const update = clone.map((income) => {
          return income.map((data) => {
            data.sheetsIndex = count;
            count = count + 1;
            return data;
          });
        });

        setTimeout(() => {
          console.log(update);
          setIncomes(update);
        }, 100);
      }
    }
  };

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
                element.draft = false;
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
                element.fetching = false;
                element.draft = false;
                return element;
              } else {
                return undefined;
              }
            } else {
              return undefined;
            }
          });

        // return new Promise<IIncome | undefined>((resolve) => {
        //   setTimeout(() => {
        //     return resolve(undefined);
        //   }, 1000);
        // });

        default:
          return undefined;
      }
    } catch (error) {
      return undefined;
    }
  };

  const onSelectDate = (date: Date) => {
    setDateSelect(date);
  };

  useEffect(() => {
    setIncomes(incomes);
  }, [incomes]);

  if (incomes === undefined) {
    return <>Google Sheets URL Error</>;
  }

  return (
    <>
      {/* <FloatingButton
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
      ></FloatingButton> */}
      <DetailOfMonth
        onDateChange={onSelectDate}
        incomes={incomesData}
      ></DetailOfMonth>
      <div className="flex gap-10 flex-col-reverse">
        {incomesData?.map((income, dayIndex) => {
          if (dateSelect ? dateSelect.getDate() - 1 === dayIndex : true)
            return (
              <React.Fragment key={`incomes-day-${dayIndex}`}>
                <IncomeRender
                  stopFetch={stopFetch}
                  updateIndexSheetsOnMonth={updateIndexSheetsOnMonth}
                  onUpdate={onElementUpdate}
                  incomeOfday={income}
                  dayIndex={dayIndex + 1}
                  date={dateNow}
                  IncomeTypesOptions={IncomeTypesOptions}
                ></IncomeRender>
              </React.Fragment>
            );
        })}
      </div>
    </>
  );
};

export default IncomeListInDay;
