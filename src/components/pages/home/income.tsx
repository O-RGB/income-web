"use client";
import React, { useEffect, useState } from "react";
import DetailOfMonth from "@/components/pages/detail-of-month/detail-of-month";
import IncomeRender from "./render/panel-front";
import { Button, Form } from "antd";
import SummaryOfDay from "../../tools/summary/summaryOfDay";
import Analytics from "../../modals/analytics/analytics";
import ButtonCommon from "@/components/common/button";
import { FcCalculator, FcPieChart, FcSettings } from "react-icons/fc";
import CategorySummary from "@/components/tools/summary/category/category-summary";
import CalculatorModals from "@/components/modals/calculator/calculator";
import { useIncomes } from "@/hooks/incomes-hooks";

const IncomeListInDay: React.FC<IPanelIncomes> = ({
  master,
  incomes,
  incomesLocal,
  onSelectDate,
  dateSelect,
  onClickSetting,
  onClickCategory,
  loading,
  version,
  Set,
  onFilterCategory,
  incomesFilter,
}) => {
  const {
    Incomes,
    setIncomeData,
    removeIncomeData,
    resetIncome,
    action,
    valueStore,
  } = useIncomes();

  const [analytics, setAnalytics] = useState<boolean>(false);
  const [headForm] = Form.useForm();
  const [onClickCalculator, setCalculator] = useState<boolean>(false);

  const onDateChange = (date: Date) => {
    // set data in component
    resetIncome();
    setCalculator(false);
    headForm.resetFields();
    removeIncomeData();

    //call back to main
    onSelectDate(date);
  };

  const setIncomes = (incoming: IIncome[] = []) => {
    let clone = [...Incomes];
    setIncomeData([]);
    let ignore: IIncome[] = [];
    if (clone.length > 0) {
      ignore = clone.filter(
        (d) => d && (d.draft !== false || d.edit !== false)
      );
    }
    let newIncomes = [...incoming, ...ignore];
    setIncomeData(newIncomes);
  };

  const mappingIncomesServerToLocal = (
    incomesFetch: IIncome[],
    localFetch: IIncome[]
  ) => {
    if (incomesFetch.length > 0 && localFetch.length === 0) {
      return incomesFetch;
    }
    let updateFetch: IIncome[] = [];
    let dataNotSave: IIncome[] = [];

    localFetch.map((ins) => {
      if (ins.delete === false) {
        let data = incomesFetch.findIndex(
          (x) => x.sheetsIndex === ins.sheetsIndex
        );
        if (data >= 0) {
          updateFetch.push({
            ...incomesFetch[data],
            fetching: false,
            delete: false,
            edit: false,
          });
        } else {
          if (incomesFetch[data]) {
            dataNotSave.push(incomesFetch[data]);
          }
        }
      }
    });

    return [...updateFetch, ...dataNotSave];
  };

  const dateDisplayIsNotCurrent = (firstIncomes: IIncome | undefined) => {
    if (!firstIncomes) {
      return true;
    }
    let incomingData: Date = firstIncomes.day;

    let incomingMonth: number = incomingData.getMonth();
    let incomingYear: number = incomingData.getFullYear();

    let currentMonth: number = dateSelect.getMonth();
    let currentYear: number = dateSelect.getFullYear();

    if (incomingMonth === currentMonth && incomingYear === currentYear) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    // if (incomesLocal) {
    const update = mappingIncomesServerToLocal(incomes, incomesLocal);
    setIncomes(update);
    // } else {
    //   setIncomes(incomes);
    // }
  }, [incomes]);

  // useEffect(() => {
  //   setIncomes(incomesLocal);
  // }, [incomesLocal]);

  return (
    <div className="relative z-30 px-2 flex flex-col gap-2">
      <Analytics
        master={master}
        open={analytics}
        close={() => setAnalytics(false)}
      ></Analytics>
      <CalculatorModals
        open={onClickCalculator}
        onClose={() => setCalculator(false)}
      ></CalculatorModals>

      <div className="flex flex-col gap-1 relative">
        <div className="absolute top-1 text-[8px] text-gray-500">
          Version: {version} Bata test
        </div>

        <div className="flex justify-between items-center ">
          <DetailOfMonth
            master={master}
            date={dateSelect}
            onDateChange={onDateChange}
            incomes={incomes}
            panelBut={
              <Button
                onClick={onClickSetting}
                icon={<FcSettings></FcSettings>}
                type="text"
              ></Button>
            }
          ></DetailOfMonth>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <CategorySummary onClickCategory={onClickCategory}></CategorySummary>
      </div>
      {!onFilterCategory && (
        <div className="flex gap-1">
          <SummaryOfDay date={dateSelect} incomeOfday={Incomes}></SummaryOfDay>
          <ButtonCommon
            onClick={() => setAnalytics(!analytics)}
            icon={<FcPieChart className="text-2xl"></FcPieChart>}
          ></ButtonCommon>
          <ButtonCommon
            onClick={() => setCalculator(!onClickCalculator)}
            icon={<FcCalculator className="text-2xl"></FcCalculator>}
          ></ButtonCommon>
        </div>
      )}

      <IncomeRender
        headForm={headForm}
        Set={Set}
        functions={action}
        incomes={Incomes}
        dateSelect={dateSelect}
        loading={loading}
        countDraft={valueStore.countDraft}
        indexEditing={valueStore.indexEditing}
        master={master}
        onFilterCategory={onFilterCategory}
        incomesFilter={incomesFilter}
      ></IncomeRender>
    </div>
  );
};

export default IncomeListInDay;
