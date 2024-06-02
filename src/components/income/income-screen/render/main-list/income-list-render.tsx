import React, { useEffect, useState } from "react";
import IncomeGroupOfDay from "../group/groupOfDay";
import DayHeader from "../header/dayHeader";
import SummaryOfDay from "../summary/summaryOfDay";
import { DateFormat } from "@/libs/date-lib";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface IncomeRenderProps {
  incomeOfday: IIncome[] | "load";
  // dayIndex: number;
  date: Date;
  onUpdate: (
    action: "add" | "update" | "delete",
    element: IIncome
  ) => Promise<IIncome | undefined>;
  IncomeTypesOptions: RadioOptions[];
  updateIndexSheetsOnMonth: (day: number, income: IIncome[]) => void;
  apiFetching: boolean;
  loading: boolean;
  sheetsFirstIndexOfDate?: number;
}

const IncomeRender: React.FC<IncomeRenderProps> = ({
  date,
  // dayIndex,
  incomeOfday = [],
  onUpdate,
  apiFetching,
  IncomeTypesOptions,
  updateIndexSheetsOnMonth,
  loading,
  sheetsFirstIndexOfDate,
}) => {
  const [IncomeOfDay, setIncomeOfDay] = useState<IIncome[] | "load" | null>(
    null
  );

  // const setDelete = (indexDeleting: number) => {
  //   if (IncomeOfDay !== "load" && IncomeOfDay) {
  //     const clone = IncomeOfDay;
  //     setIncomeOfDay("load");

  //     let deleted: number = 0;
  //     var incomeUpdate: IIncome[] = [];
  //     clone.map((income, i) => {
  //       var im = income;
  //       if (i === indexDeleting) {
  //         im.delete = true;
  //         im.fetching = true;
  //         im.draft = true;
  //       }

  //       if (im.delete) {
  //         im.delete = true;
  //         im.fetching = false;
  //         im.draft = false;
  //         deleted = deleted + 1;
  //       } else {
  //         im.delete = false;
  //         im.fetching = false;
  //         im.draft = false;
  //       }

  //       if (!im.delete) {
  //         const sheetsIndex = i + 2;
  //         incomeUpdate.push({
  //           ...im,
  //           sheetsIndex: sheetsIndex,
  //         });
  //       }
  //     });

  //     setTimeout(() => {
  //       setIncomeOfDay(incomeUpdate);
  //       updateIndexSheetsOnMonth(date.getDate(), incomeUpdate);
  //     }, 100);

  //     return undefined;
  //   }
  // };

  const setDelete = (indexDeleting: number) => {
    if (IncomeOfDay !== "load" && IncomeOfDay && sheetsFirstIndexOfDate) {
      var clone = IncomeOfDay;
      setIncomeOfDay("load");
      var check = clone[indexDeleting];
      if (check) {
        var newIncome: IIncome[] = [];
        var countFirstSheets: number = sheetsFirstIndexOfDate;
        clone.map((x, i) => {
          if (i === indexDeleting) {
            x.delete = true;
          }
          if (!x.delete) {
            x.sheetsIndex = countFirstSheets;
            countFirstSheets = countFirstSheets + 1;
            newIncome.push({ ...x });
          }
        });
        setTimeout(() => {
          setIncomeOfDay(newIncome);
          // updateIndexSheetsOnMonth(date.getDate(), clone);
        }, 100);
      }
    }
  };

  const setAdd = (indexUpdated: number, income: IIncome) => {
    if (IncomeOfDay !== "load" && IncomeOfDay) {
      // setIncomeOfDay("load");
      var clone = IncomeOfDay;
      var check = clone[indexUpdated];
      if (check) {
        clone[indexUpdated] = income;
        console.log("income",income)

        setTimeout(() => {
          setIncomeOfDay(clone);
          // updateIndexSheetsOnMonth(date.getDate(), clone);
        }, 100);
      }
    }
  };

  const findIndexNotDelete = () => {
    if (IncomeOfDay !== "load") {
      if (IncomeOfDay) {
        const notDelete = IncomeOfDay?.filter((data) => data.delete !== true);
        return notDelete.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const cnageDate10 = () => {
    if (IncomeOfDay !== "load") {
      let clone = IncomeOfDay;
      setIncomeOfDay("load");
      let newElement: IIncome = {
        sheetsIndex: findIndexNotDelete() + 2,
        _priceType: "Expenses",
        day: date,
        expensesCount: 0,
        expensesPrice: 0,
        name: "",
        revenueCount: 0,
        revenuePrice: 0,
        types: "",
        delete: false,
        fetching: false,
        draft: true,
      };

      clone?.push(newElement);
      setTimeout(() => {
        setIncomeOfDay(clone);
      }, 100);
    }
  };

  useEffect(() => {
    setIncomeOfDay(incomeOfday);
  }, [incomeOfday]);
  return (
    <>
      <div className="flex flex-col" key={`incom-day-${date.getDate()}`}>
        <SummaryOfDay
          date={date}
          dayIndex={date.getDate()}
          incomeOfday={IncomeOfDay as IIncome[]}
        ></SummaryOfDay>

        {loading ? (
          <div className="h-56 flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          </div>
        ) : (
          <>
            {/* <DayHeader date={date} dayIndex={dayIndex}></DayHeader> */}
            {/* {dayIndex <= date.getDate() && ( */}
            <div onClick={apiFetching == false ? cnageDate10 : () => {}}>
              <div className="w-full flex justify-center items-center p-2">
                <div className="p-2 border rounded-lg cursor-pointer bg-blue-500 select-none text-white">
                  เพิ่มข้อมูลวันที่ {date.getDate()}
                </div>
              </div>
            </div>
            {/* )} */}

            <IncomeGroupOfDay
              IncomeTypesOptions={IncomeTypesOptions}
              actionApi={{
                onUpdate: onUpdate,
                setAdd: setAdd,
                setDelete: setDelete,
              }}
              date={date}
              // dayIndex={dayIndex}
              incomeOfday={IncomeOfDay as IIncome[]}
            ></IncomeGroupOfDay>
          </>
        )}
      </div>
    </>
  );
};

export default IncomeRender;
