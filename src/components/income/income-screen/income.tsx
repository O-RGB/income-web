"use client";
import React, { useEffect, useState } from "react";
import DetailOfMonth from "@/components/pages/detail-of-month/detail-of-month";
import IncomeRender from "./render/im-render";
import { Button, Form } from "antd";
import LineChart from "@/components/charts/test";
import { GetColor, getColorPair } from "@/libs/color";
import BarChart from "@/components/charts/bar-chart";
import SummaryOfDay from "./render/summary/summaryOfDay";
import { FaChartPie } from "react-icons/fa6";
import Analytics from "./analytics/analytics";
import { GrSettingsOption } from "react-icons/gr";

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
  const [analytics, setAnalytics] = useState<boolean>(false);
  const [countDraft, setCountDraft] = useState<number>(0);
  const [headForm] = Form.useForm();

  const updateSheetsIndex = async (
    incomes: IIncome[],
    on: "AUTO" | "CLOSE" = "AUTO"
  ) => {
    var _clone: IIncome[] = [];
    _clone = incomes;

    if (on === "AUTO" && firstIndexSheets >= 0) {
      let startIndex = firstIndexSheets;
      _clone = _clone.map((data) => {
        let obj = { ...data, sheetsIndex: startIndex };
        if (!obj.delete) {
          startIndex = startIndex + 1;
        }
        return obj;
      });
    }

    setIncomes(_clone);
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

      updateSheetsIndex(clone, "CLOSE");
      setCountDraft(0);
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

    clone = [...clone, newElement];

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
    let label: string[] = [];
    let datasets: ILineChartDatasets[] = [];
    let sumBar: number[] = [];
    let colorBar: string[] = [];
    let colorBarBorder: string[] = [];
    IGetDisplayCal.types.map((type) => {
      if (type.type !== "ไม่มีหมวดหมู่" && type.type !== "รายจ่ายประจำ") {
        let { color, border } = getColorPair();
        colorBar.push(color);
        colorBarBorder.push(border);
        label.push(type.type);
        let count = type.plot.map((r) => r.expenses);
        let sum = count.reduce((partialSum, a) => partialSum + a, 0);
        sumBar.push(sum);
      }
    });
    datasets = [
      {
        label: "label",
        backgroundColor: colorBar,
        borderColor: colorBarBorder,
        borderWidth: 2,
        data: sumBar,
        yAxisID: "y",
      },
    ];
    data = {
      datasets: datasets,
      labels: label,
    };

    return data;
  };

  useEffect(() => {
    if (incomes.length > 0) {
      setFirstIndex(incomes[0].sheetsIndex);
      setCountDraft(0);
      setIncomes(incomes);
    } else {
      setIncomes([]);
      setFirstIndex(-1);
    }
  }, [incomes]);

  useEffect(() => {
    if (master.IGetDisplayCal) {
      const data = calLineChart(master.IGetDisplayCal);
      setChartData(data);
    }
  }, [master.IGetDisplayCal]);

  return (
    <div className="px-2 flex flex-col gap-2">
      <Analytics open={analytics} close={() => setAnalytics(false)}></Analytics>
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

      <div className="flex flex-col gap-1">
        <DetailOfMonth
          master={master}
          date={dateSelect}
          onDateChange={(date) => {
            onSelectDate(date);
            setIncomes([]);
          }}
          incomes={incomes}
        ></DetailOfMonth>
        {/* <hr /> */}
        <div className="flex justify-between gap-2">
          <Button
            onClick={() => setAnalytics(!analytics)}
            className="w-full shadow-sm"
            
          >
            <div className="flex gap-2   justify-center items-center">
              <div>
                <FaChartPie></FaChartPie>
              </div>
              <div className="">สรุปข้อมูลเดือนนี้</div>
            </div>
          </Button>
          <Button
            onClick={() => setAnalytics(!analytics)}
            className="w-fit shadow-sm"
            
          >
            <div className="flex gap-2   justify-center items-center">
              <div>
                <GrSettingsOption></GrSettingsOption>
              </div>
              <div className="">ตั้งค่า</div>
            </div>
          </Button>
        </div>
      </div>

      <div className="p-2 border rounded-md">
        {chartData && <BarChart data={chartData}></BarChart>}
      </div>

      <SummaryOfDay
        date={dateSelect}
        dayIndex={dateSelect.getDate()}
        incomeOfday={incomes}
      ></SummaryOfDay>

      {/* {countDraft} */}
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
    </div>
  );
};

export default IncomeListInDay;
