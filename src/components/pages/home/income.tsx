"use client";
import React, { useEffect, useState } from "react";
import DetailOfMonth from "@/components/pages/detail-of-month/detail-of-month";
import IncomeRender from "./render/im-render";
import { Button, Form } from "antd";
import SummaryOfDay from "../../tools/summary/summaryOfDay";
import Analytics from "../../modals/analytics/analytics";
import { CalSumOfMonth } from "../../modals/analytics/lib";
import ButtonCommon from "@/components/common/button";
import { FcCalculator, FcPieChart, FcSettings } from "react-icons/fc";
import CategorySummary from "@/components/tools/summary/category/category-summary";
import CalculatorModals from "@/components/modals/calculator/calculator";
import {
  DynamicKeysToArray,
  genIncomeKeyByIndex,
  hanndelInputIncome,
} from "./render/im-lib";

interface IncomeListInDayProps {
  incomes: IIncome[];
  master: IMasterDataImcomes;
  onAddIncome: (
    income: IIncome[]
  ) => Promise<IGeneralReturnFetch<IIncome[] | undefined>>;
  deleteIncome?: (
    input: IIncomeDelete
  ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
  onEditIncome: (
    input: IIncomeEditInput
  ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
  onMoveIncome: (
    input: IIncomeMoveInput
  ) => Promise<IGeneralReturnFetch<boolean | undefined>>;
  onSelectDate: (date: Date) => void;
  onClickSetting?: () => void;
  dateSelect: Date;
  loading: ILoading;
  version?: string;
}

const IncomeListInDay: React.FC<IncomeListInDayProps> = ({
  master,
  incomes,
  onAddIncome,
  deleteIncome,
  onSelectDate,
  onEditIncome,
  onMoveIncome,
  dateSelect,
  onClickSetting,
  loading,
  version,
}) => {
  const [incomesData, setIncomes] = useState<IIncome[]>([]);
  const [firstIndexSheets, setFirstIndex] = useState<number>(0);
  const [analytics, setAnalytics] = useState<boolean>(false);
  const [countDraft, setCountDraft] = useState<number>(0);
  const [headForm] = Form.useForm();
  const [onClickCalculator, setCalculator] = useState<boolean>(false);
  const [indexEdit, setIndexEdit] = useState<number[]>([]);

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
    _clone = [...incomes];

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

    return _clone;
  };

  const fetchingByIndex = (index: number) => {
    var _clone: IIncome[] = [...incomesData];
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
  const updateSheetsAndFetch = async (
    setIncome?: IIncome[],
    mode: "DRAFT" | "ALL" = "DRAFT"
  ) => {
    var _clone: IIncome[] = setIncome ? setIncome : [...incomesData];
    setCountDraft(0);
    let fetch = _clone.map((data) => {
      if (mode === "DRAFT" ? data.draft && !data.delete : true) {
        data.fetching = true;
        data.draft = false;
        data.edit = false;
        data.name = "กำลังส่ง";
      }
      return data;
    });
    return await updateSheetsIndex(fetch);
  };
  const addIncomes = async (incomesList: IIncome[]) => {
    let addReslut: { index: number; result: boolean }[] = [];

    let clone = incomesData;
    setIncomes([]);
    const data = await onAddIncome(incomesList);
    const res = data.data;
    if (res && data.success) {
      res?.map((inSheets) => {
        const index = inSheets.indexOfList;
        const _check = clone[index];
        if (_check) {
          clone[index] = {
            ...clone[index],
            ...inSheets,
            draft: false,
            delete: false,
            fetching: false,

            _priceType: inSheets.expensesPrice > 0 ? "Expenses" : "Revenue",
          };
          addReslut.push({
            index: index,
            result: true,
          });
        }
      });

      updateSheetsIndex(clone, "CLOSE");
      setCountDraft(0);
      setIndexEdit([]);
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
      edit: false,
      draft: true,
      comment: "",
    };

    clone = [...clone, newElement];

    const indexDraft = clone.length - 1;
    let cloneEditIndex: number[] = [...indexEdit];
    cloneEditIndex.push(indexDraft);
    setIndexEdit(cloneEditIndex);

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
      const deleteIndexEdit = indexEdit?.filter((data) => data !== listIndex);
      setIndexEdit(deleteIndexEdit);
      updateSheetsIndex(incomeUpdate);
    } else {
      updateSheetsIndex(clone);
    }
  };

  const onExitEdit = async (listIndex: number) => {
    let clone = [...incomesData];
    setIncomes([]);
    var edit = clone[listIndex];
    edit.draft = false;
    edit.edit = false;
    edit.fetching = false;
    updateSheetsIndex(clone);
  };

  const editOnServer = async (sheetsIndex: number, listIndex: number) => {
    let clone = [...incomesData];
    setIncomes([]);
    var backup: IIncome = { ...clone[listIndex] };
    updateSheetsAndFetch();

    const valueUpdate = headForm.getFieldsValue();
    const keyUpdate = DynamicKeysToArray(valueUpdate);

    var incomeUpdate: IIncome[] = [];
    keyUpdate.map((data) => {
      const dat = hanndelInputIncome(data, dateSelect);
      incomeUpdate.push(dat);
    });

    if (incomeUpdate.length > 1) {
      return;
    }

    let update = incomeUpdate[0];
    update.sheetsIndex = sheetsIndex;
    const res = await onEditIncome({
      newIncome: [update],
      sheetsDateStr: dateSelect.toISOString().split("T")[0],
      sheetsIndex: sheetsIndex,
    });

    if (res) {
      editOnClient(0, listIndex, update);
    } else {
      editOnClient(0, listIndex, backup);
    }
  };
  const editOnClient = async (
    sheetsIndex: number,
    listIndex: number,
    incomeUpdated?: IIncome
  ) => {
    if (listIndex === -1) {
      setIndexEdit([]);
      return;
    }
    setIndexEdit([listIndex]);
    let clone = [...incomesData];
    var edit = clone[listIndex];
    if (incomeUpdated) {
      clone[listIndex] = incomeUpdated;
      edit = incomeUpdated;
    }
    clone.map((data) => {
      if (data.delete === false) {
        data.draft = false;
        data.edit = false;
        data.fetching = false;
      }
    });

    setIncomes([]);
    if (!incomeUpdated) {
      edit.draft = true;
      edit.edit = true;
    } else {
      setIndexEdit([]);
    }
    updateSheetsIndex(clone);

    let map = genIncomeKeyByIndex(listIndex, edit);
    headForm.setFieldsValue(map);
  };

  const editSheetsIndexServer = async (incomeUpdate: IIncome[]) => {
    if (incomeUpdate.length === 0) {
      return;
    }

    var clone: IIncome[] = [];
    [...incomeUpdate].map((data) => {
      if (!data.delete) {
        clone.push(data);
      }
    });

    let fetch: IIncome[] = [];
    for (let index = 0; index < incomeUpdate.length; index++) {
      let element: IIncome = { ...incomeUpdate[index] };
      if (!element.delete) {
        element.expensesCount = 0;
        element.expensesPrice = 0;
        element.revenueCount = 0;
        element.revenuePrice = 0;
        element.types = "";
        element.name = "กำลังย้าย";
        element.fetching = true;
        fetch.push(element);
      }
    }
    setIncomes(fetch);

    let sheetsIndex: number[] = [];
    incomeUpdate.map((data) => {
      if (!data.delete) {
        sheetsIndex.push(data.sheetsIndex);
      }
    });

    await onMoveIncome?.({
      rowIndexMove: sheetsIndex,
      sheetsDate: dateSelect.toISOString().split("T")[0],
    })
      .then((data) => {
        if (data.success) {
          let mapItem = new Map<number, IIncome>();
          let updateList: IIncome[] = [];
          clone.map((data) => {
            data.fetching = false;
            mapItem.set(data.sheetsIndex, data);
          });

          if (mapItem.size === 0) {
            return;
          }

          sheetsIndex.map((item, index) => {
            let getItemByMaping: IIncome | undefined = mapItem.get(item);
            if (!getItemByMaping) {
              return;
            }
            getItemByMaping.sheetsIndex = firstIndexSheets + index;
            updateList.push(getItemByMaping);
          });

          if (updateList.length !== clone.length) {
            return;
          }
          setIncomes([]);
          updateSheetsIndex(updateList);
        } else {
        }
      })
      .catch((er) => {
        console.error(er);
      });
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
      <CalculatorModals
        open={onClickCalculator}
        onClose={() => setCalculator(false)}
      ></CalculatorModals>
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
      <div className="flex flex-col gap-1">
        {/* <div className="text-xs  ">หมวดหมู่</div> */}
        <CategorySummary></CategorySummary>
      </div>
      <div className="flex gap-1">
        <SummaryOfDay
          date={dateSelect}
          incomeOfday={incomesData}
        ></SummaryOfDay>
        <ButtonCommon
          onClick={() => setAnalytics(!analytics)}
          icon={<FcPieChart className="text-2xl"></FcPieChart>}
        ></ButtonCommon>
        <ButtonCommon
          onClick={() => setCalculator(!onClickCalculator)}
          icon={<FcCalculator className="text-2xl"></FcCalculator>}
        ></ButtonCommon>
      </div>

      <IncomeRender
        headForm={headForm}
        action={{
          setDraft: addDraft,
          setDeleteOnClient: deleteOnClient,
          setDelete: deleteOnServer,
          setAdd: addIncomes,
          setFetchingDraft: updateSheetsAndFetch,
          onSelectEdit: editOnClient,
          onExitEdit: onExitEdit,
          onSaveEdit: editOnServer,
          editSheetsIndexServer: editSheetsIndexServer,
        }}
        incomes={incomesData}
        dateSelect={dateSelect}
        loading={loading}
        draftCount={countDraft}
        master={master}
        indexEdit={indexEdit}
      ></IncomeRender>
    </div>
  );
};

export default IncomeListInDay;
