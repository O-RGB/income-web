"use client";
import React, { useEffect, useState } from "react";
import DetailOfMonth from "@/components/pages/detail-of-month/detail-of-month";
import IncomeRender from "./render/im-render";
import { Button, Form } from "antd";
import BarChart from "@/components/charts/bar-chart";
import SummaryOfDay from "./render/summary/summaryOfDay";
import { FaChartPie } from "react-icons/fa6";
import Analytics from "./analytics/analytics";
import { GrSettingsOption } from "react-icons/gr";
import { CalLineChart, CalSumOfMonth } from "./analytics/lib";
import ButtonCommon from "@/components/common/button";
import { FcSettings } from "react-icons/fc";
import { IconsModelList } from "@/utils/models/icons";

interface IncomeListInDayProps {
  incomes: IIncome[];
  master: IMasterDataImcomes;
  onAddIncome: (
    income: IIncome[]
  ) => Promise<IGeneralReturnFetch<IIncome[] | undefined>>;
  deleteIncome?: (
    input: IIncomeDelete
  ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
  onSelectDate: (date: Date) => void;
  onClickSetting?: () => void;
  dateSelect: Date;
  loading: ILoading;
  version?: string;
  icons: IconsModelList;
  fetchNewType?: () => Promise<void>;
}

const IncomeListInDay: React.FC<IncomeListInDayProps> = ({
  master,
  incomes,
  onAddIncome,
  deleteIncome,
  onSelectDate,
  dateSelect,
  onClickSetting,
  loading,
  version,
  icons,
  fetchNewType,
}) => {
  const [incomesData, setIncomes] = useState<IIncome[]>([]);
  const [firstIndexSheets, setFirstIndex] = useState<number>(0);
  const [analytics, setAnalytics] = useState<boolean>(false);
  const [countDraft, setCountDraft] = useState<number>(0);
  const [headForm] = Form.useForm();

  const countDraftIndex = (mode: "-" | "+") => {
    setCountDraft((value) => {
      if (mode === "+") {
        return value + 1;
      } else {
        if (value > 0) {
          return value - 1;
        } else {
          return 0;
        }
      }
    });
  };

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
    console.log(data);
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
      console.log("add clone", clone);

      updateSheetsIndex(clone, "CLOSE");
      setCountDraft(0);
    }

    return addReslut;
  };

  const addDraft = () => {
    let clone = incomesData;
    setIncomes([]);
    countDraftIndex("+");

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
      comment: "",
    };

    clone = [...clone, newElement];

    setTimeout(() => {
      setIncomes(clone);
    }, 100);
  };

  const deleteOnServer = async (sheetsIndex: number, listIndex: number) => {
    if (deleteIncome) {
      fetchingByIndex(listIndex);
      const deleted = await deleteIncome({
        sheetsIndex,
        sheetsDate: dateSelect,
      });
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
    let deleted = data.delete;

    if (data) {
      //Animation
      incomeUpdate = clone.map((_, i) => {
        if (i === listIndex) {
          _.delete = true;
        }
        return _;
      });
      if (!deleted) {
        countDraftIndex("-");
      }
      // setCountDraft((value) => value - 1);
      updateSheetsIndex(incomeUpdate);
    } else {
      updateSheetsIndex(clone);
    }
  };

  const [chartData, setChartData] = useState<ILineChart>();

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
      const data = CalSumOfMonth(master);
      setChartData(data);
    }
  }, [master.IGetDisplayCal]);

  return (
    <div className="relative z-30 px-2 flex flex-col gap-2">
      <Analytics
        master={master}
        open={analytics}
        close={() => setAnalytics(false)}
      ></Analytics>
      {/* incomesData: {JSON.stringify(incomesData)}
      firstIndexSheets: {JSON.stringify(firstIndexSheets)} */}

      <div className="flex flex-col gap-1 relative">
        <div className="absolute top-1 text-[8px] text-gray-500">
          Version: {version} Bata test
        </div>

        <div className="flex justify-between items-center ">
          <DetailOfMonth
            master={master}
            date={dateSelect}
            onDateChange={(date) => {
              onSelectDate(date);
              setIncomes([]);
            }}
            incomes={incomes}
            panelBut={
              <>
                <Button
                  onClick={onClickSetting}
                  icon={<FcSettings></FcSettings>}
                  type="text"
                ></Button>
              </>
            }
          ></DetailOfMonth>
        </div>
      </div>

      <div className="flex gap-1">
        <SummaryOfDay
          date={dateSelect}
          dayIndex={dateSelect.getDate()}
          incomeOfday={incomes}
        ></SummaryOfDay>
        <ButtonCommon
          onClick={() => setAnalytics(!analytics)}
          icon={<FaChartPie></FaChartPie>}
        >
          สรุป
        </ButtonCommon>
      </div>
      {/* {countDraft} */}
      <IncomeRender
        fetchNewType={fetchNewType}
        icons={icons}
        headForm={headForm}
        action={{
          setDraft: addDraft,
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
