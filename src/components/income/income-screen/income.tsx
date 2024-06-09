"use client";
import React, { useEffect, useState } from "react";
import DetailOfMonth from "@/components/pages/detail-of-month/detail-of-month";
import IncomeRender from "./render/im-render";

interface IncomeListInDayProps {
  incomes?: IIncome[];
  onAddIncome: (
    income: IIncome[]
  ) => Promise<IGeneralReturnFetch<IIncome[] | undefined>>;
  deleteIncome?: (
    sheetsIndex: number
  ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
  IncomeTypesOptions: RadioOptions[];
  onSelectDate: (date: Date) => void;
  dateSelect: Date;
  loading: ILoading;
}

const IncomeListInDay: React.FC<IncomeListInDayProps> = ({
  incomes,
  onAddIncome,
  deleteIncome,
  IncomeTypesOptions,
  onSelectDate,
  dateSelect,
  loading,
}) => {
  const [incomesData, setIncomes] = useState<IIncome[]>();
  const [firstIndexSheets, setFirstIndex] = useState<number>();
  const [countDraft, setCountDraft] = useState<number>(0);

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

  const findIndexNotDelete = () => {
    if (incomesData) {
      if (incomesData) {
        const notDelete = incomesData?.filter((data) => data.delete !== true);
        return notDelete.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const fetchingIncomesDraft = () => {
    if (incomesData) {
      var _clone: IIncome[] = incomesData;
      setIncomes(undefined);
      setCountDraft(0);

      let fetch = _clone.map((data) => {
        if (data.draft && !data.delete) {
          data.fetching = true;
          data.draft = false;
          data.name = "กำลังส่ง";
        }

        return data;
      });

      setTimeout(() => {
        setIncomes(fetch);
      }, 100);
    }
  };

  const fetchingByIndex = (index: number) => {
    if (incomesData) {
      var _clone: IIncome[] = incomesData;
      setIncomes(undefined);
      setCountDraft(0);

      const _check = _clone[index];
      if (_check) {
        _clone[index].fetching = true;
      }

      setTimeout(() => {
        setIncomes(_clone);
      }, 100);
    }
  };

  const addIncomes = async (incomesList: IIncome[]) => {
    let addReslut: { index: number; result: boolean }[] = [];
    if (incomesData) {
      let clone = incomesData;
      setIncomes(undefined);
      const data = await onAddIncome(incomesList);
      if (data && data.success) {
        data.data?.map((inSheets) => {
          const index = inSheets.indexOfList;
          const _check = clone[index];
          if (_check) {
            clone[index] = {
              ...clone[index],
              ...inSheets,
              draft: false,
              delete: false,
              fetching: false,
            };
            addReslut.push({
              index: index,
              result: true,
            });
          }
        });

        setTimeout(() => {
          setIncomes(clone);
        }, 100);
      }
    }

    return addReslut;
  };

  const addDraft = () => {
    if (incomesData) {
      let clone = incomesData;
      setIncomes(undefined);
      setCountDraft((value) => value + 1);
      let newElement: IIncome = {
        sheetsIndex: 0,
        // sheetsIndex: findIndexNotDelete() + 2,
        _priceType: "Expenses",
        day: dateSelect,
        expensesCount: 0,
        expensesPrice: 0,
        name: "",
        revenueCount: 0,
        revenuePrice: 0,
        types: "",
        indexOfList: clone.length,
        delete: false,
        fetching: false,
        draft: true,
      };

      clone?.push(newElement);
      setTimeout(() => {
        setIncomes(clone);
      }, 100);
    }
  };

  const deleteOnServer = async (sheetsIndex: number, listIndex: number) => {
    if (deleteIncome) {
      fetchingByIndex(listIndex);
      const deleted = await deleteIncome(sheetsIndex);
      if (deleted.data === true) {
        deleteOnClient(listIndex);
      }
    }
  };

  const deleteOnClient = async (listIndex: number) => {
    if (incomesData) {
      let clone = incomesData;
      setIncomes(undefined);
      var incomeUpdate: IIncome[] = [];
      var data = clone[listIndex];

      if (data) {
        //Animation
        incomeUpdate = clone.map((_, i) => {
          if (i === listIndex) {
            _.delete = true;
          }
          return _;
        });
        if (data.draft) {
        }
        setTimeout(() => {
          setCountDraft((value) => (value > 0 ? value - 1 : 0));
          setIncomes(incomeUpdate);
        }, 100);
      } else {
        setTimeout(() => {
          setIncomes(clone);
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (incomes) {
      if (incomes.length > 0) {
        setFirstIndex(incomes[0].sheetsIndex);
        setIncomes(incomes);
      }
    }

    if (loading.pageLoad === false && !incomes) {
      setFirstIndex(0);
      setIncomes([]);
    }
  }, [incomes]);

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
        incomes={incomes}
      ></DetailOfMonth>
      <IncomeRender
        action={{
          setDraft: addDraft,
          // setDelete: deleteIncomes,
          setDeleteOnClient: deleteOnClient,
          setDelete: deleteOnServer,
          setAdd: addIncomes,
          setFetchingDraft: fetchingIncomesDraft,
        }}
        incomes={incomesData}
        dateSelect={dateSelect}
        loading={loading}
        types={IncomeTypesOptions}
        draftCount={countDraft}
      ></IncomeRender>
    </>
  );
};

export default IncomeListInDay;
