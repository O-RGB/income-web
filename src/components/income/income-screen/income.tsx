"use client";
import React, { useEffect, useState } from "react";
import DetailOfMonth from "@/components/pages/detail-of-month/detail-of-month";
import IncomeRender from "./render/im-render";
import { Form } from "antd";
import LineChart from "@/components/charts/test";
import { GetColor } from "@/libs/color";

interface IncomeListInDayProps {
  incomes: IIncome[];
  master: IMasterDataImcomes;
  onAddIncome: (
    income: IIncome[]
  ) => Promise<IGeneralReturnFetch<IIncome[] | undefined>>;
  deleteIncome?: (
    sheetsIndex: number
  ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
  onSelectDate: (date: Date) => void;
  dateSelect: Date;
  loading: ILoading;
}

const IncomeListInDay: React.FC<IncomeListInDayProps> = ({
  master,
  incomes,
  onAddIncome,
  deleteIncome,
  onSelectDate,
  dateSelect,
  loading,
}) => {
  const [incomesData, setIncomes] = useState<IIncome[]>([]);
  const [firstIndexSheets, setFirstIndex] = useState<number>(0);
  const [countDraft, setCountDraft] = useState<number>(0);
  const [headForm] = Form.useForm();

  const updateSheetsIndex = async (incomes: IIncome[]) => {
    var _clone: IIncome[] = [];
    _clone = incomes;
    let startIndex = firstIndexSheets;
    _clone = _clone.map((data) => {
      let obj = { ...data, sheetsIndex: startIndex };
      if (!obj.delete) {
        startIndex = startIndex + 1;
      }
      return obj;
    });

    // setTimeout(() => {
    setIncomes(_clone);
    // }, 100);
  };

  const fetchingByIndex = (index: number) => {
    var _clone: IIncome[] = incomesData;
    setIncomes([]);
    setCountDraft(0);

    const _check = _clone[index];
    if (_check) {
      _clone[index].fetching = true;
    }

    updateSheetsIndex(_clone);
    // setTimeout(() => {
    //   setIncomes(_clone);
    // }, 100);
  };
  const updateSheetsAndFetch = async () => {
    var _clone: IIncome[] = incomesData;
    setCountDraft(0);

    let fetch = _clone.map((data) => {
      if (data.draft && !data.delete) {
        data.fetching = true;
        data.draft = false;
        data.name = "กำลังส่ง";
      }
      return data;
    });
    await updateSheetsIndex(fetch);
  };
  const addIncomes = async (incomesList: IIncome[]) => {
    let addReslut: { index: number; result: boolean }[] = [];

    let clone = incomesData;
    setIncomes([]);
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

      updateSheetsIndex(clone);
      // updateSheetsAndFetch(clone);
    }

    return addReslut;
  };

  const addDraft = () => {
    let clone = incomesData;
    setIncomes([]);
    setCountDraft((value) => value + 1);
    let newElement: IIncome = {
      sheetsIndex: 0,
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

    console.log("on draft add = ", clone.length);
    // if (clone.length === 0) {
    //   clone = [newElement];
    // } else {
    //   clone.push(newElement);
    // }
    clone = [...clone, newElement];
    console.log("cone= ", clone);
    // updateSheetsIndex(clone);
    setTimeout(() => {
      setIncomes(clone);
    }, 100);
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
    let clone = incomesData;
    setIncomes([]);
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
      setCountDraft((value) => value - 1);
      updateSheetsIndex(incomeUpdate);
    } else {
      updateSheetsIndex(clone);
    }
  };

  const [chartData, setChartData] = useState<ILineChart>();
  const calLineChart = (IGetDisplayCal: IGetDisplayCal) => {
    let data: ILineChart = {
      datasets: [],
      labels: [],
    };
    let label: string[] = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
    ];
    let datasets: ILineChartDatasets[] = [];
    IGetDisplayCal.types.map((type) => {
      // label.push(type.type);
      if (type.type !== "รายจ่ายประจำ" && type.type !== "ไม่มีหมวดหมู่") {
        let data = type.plot.map((plt) => plt.expenses);
        let color = GetColor();
        datasets.push({
          label: type.type,
          backgroundColor: color,
          borderColor: color,
          data: data,
          yAxisID: "y",
        });
      }
    });
    data = {
      datasets: datasets,
      labels: label,
    };

    console.log(data);

    return data;
  };

  useEffect(() => {
    if (incomes.length > 0) {
      setFirstIndex(incomes[0].sheetsIndex);
      setCountDraft(0);
    } else {
      setFirstIndex(0);
    }
    setIncomes(incomes ? incomes : []);

    if (master.IGetDisplayCal) {
      const data = calLineChart(master.IGetDisplayCal);
      setChartData(data);
    }
  }, [incomes]);

  return (
    <>
      {/* incomesData: {JSON.stringify(incomesData)}
      firstIndexSheets: {JSON.stringify(firstIndexSheets)} */}
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

      {chartData && <LineChart data={chartData}></LineChart>}

      <DetailOfMonth
        master={master}
        date={dateSelect}
        onDateChange={(date) => {
          onSelectDate(date);
          setIncomes([]);
        }}
        incomes={incomes}
      ></DetailOfMonth>
      {countDraft}
      <IncomeRender
        headForm={headForm}
        action={{
          setDraft: addDraft,
          // setDelete: deleteIncomes,
          setDeleteOnClient: deleteOnClient,
          setDelete: deleteOnServer,
          setAdd: addIncomes,
          setFetchingDraft: updateSheetsAndFetch,
        }}
        incomes={incomesData}
        dateSelect={dateSelect}
        loading={loading}
        draftCount={countDraft}
        master={master}
      ></IncomeRender>
    </>
  );
};

export default IncomeListInDay;
