import React, { useEffect, useState } from "react";
import DetailOfMonth from "@/components/pages/detail-of-month/detail-of-month";
import FloatingButton from "@/components/form-data/floating-button/floating-button";
import IncomeRender from "./render/main-list/income-list-render";

interface IncomeListInDayProps {
  incomes: IIncome[] | "load";
  addIncome?: (
    income: IIncome
  ) => Promise<IGeneralReturnFetch<IIncome | undefined>>;
  deleteIncome?: (
    sheetsIndex: number
  ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
  apiFetching: boolean;
  IncomeTypesOptions: RadioOptions[];
  onSelectDate: (date: Date) => void;
  dateSelect: Date;
  loading: boolean;
}

const IncomeListInDay: React.FC<IncomeListInDayProps> = ({
  incomes,
  addIncome,
  deleteIncome,
  apiFetching,
  IncomeTypesOptions,
  onSelectDate,
  dateSelect,
  loading,
}) => {
  // const dateNow = new Date();

  const [incomesData, setIncomes] = useState<IIncome[] | "load">([]);
  const [sheetsFirstIndexOfDate, setFirstIndex] = useState<number>();

  const updateIndexSheetsOnMonth = (dayIndex: number, income: IIncome[]) => {
    if (incomesData && typeof incomesData !== "string") {
      var clone = incomesData;
      // setIncomes([]);

      if (clone[dayIndex - 1]) {
        // clone[dayIndex - 1] = income;

        var count: number = 2;
        const update = clone.map((income) => {
          // return income.map((data) => {
          //   data.sheetsIndex = count;
          //   return data;
          // });
          income.sheetsIndex = count;
          count = count + 1;
          return income;
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
    if (apiFetching) {
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

                const incomeConcat: IIncome = { ...element, ...data.data };
                return incomeConcat;
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

  useEffect(() => {
    setIncomes(incomes);
    if (incomes !== "load" && incomes.length > 0) {
      setFirstIndex(incomes[0].sheetsIndex);
    }
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
        date={dateSelect}
        onDateChange={onSelectDate}
        incomes={incomesData}
      ></DetailOfMonth>
      <IncomeRender
        apiFetching={apiFetching}
        sheetsFirstIndexOfDate={sheetsFirstIndexOfDate}
        updateIndexSheetsOnMonth={updateIndexSheetsOnMonth}
        onUpdate={onElementUpdate}
        incomeOfday={incomesData}
        // dayIndex={dayIndex + 1}
        date={dateSelect}
        IncomeTypesOptions={IncomeTypesOptions}
        loading={loading}
      ></IncomeRender>
      {/* <div className="flex gap-10 flex-col-reverse">
        {incomesData?.map((income, groupDayIndex) => {
          // if (dateSelect ? dateSelect.getDate() - 1 === groupDayIndex : true)
          return (
            <React.Fragment key={`incomes-day-${groupDayIndex}`}>
              <IncomeRender
                stopFetch={stopFetch}
                updateIndexSheetsOnMonth={updateIndexSheetsOnMonth}
                onUpdate={onElementUpdate}
                incomeOfday={[income]}
                // dayIndex={dayIndex + 1}
                date={dateSelect}
                IncomeTypesOptions={IncomeTypesOptions}
              ></IncomeRender>
            </React.Fragment>
          );
        })}
      </div> */}
    </>
  );
};

export default IncomeListInDay;
