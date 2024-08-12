"use client";

import {
  DynamicKeysToArray,
  genIncomeKeyByIndex,
  hanndelInputIncome,
} from "@/components/pages/home/render/panel-lib";
import { addIncomesLocal } from "@/database/incomes";
import { FormInstance } from "antd";
import { createContext, FC, useEffect, useState } from "react";

type IncomesContextType = {
  Incomes: IIncome[];
  setIncomeData: (incomes: IIncome[]) => void;
  removeIncomeData: () => void;
  resetIncome: () => void;
  action: IClientActionIncomes | undefined;
  valueStore: IClientValue;
};

type IncomesProviderProps = {
  children: React.ReactNode;
};

export const IncomesContext = createContext<IncomesContextType>({
  Incomes: [],
  setIncomeData: () => {},
  removeIncomeData: () => {},
  resetIncome: () => {},
  action: {
    action: {},
    event: {},
    handle: {},
  },
  valueStore: {
    countDraft: 0,
    firstIndexSheets: 0,
    indexEditing: [],
  },
});

export const IncomesProvider: FC<IncomesProviderProps> = ({ children }) => {
  const [Incomes, setIncomes] = useState<IIncome[]>([]);
  const [firstIndexSheets, setFirstIndex] = useState<number>(0);
  const [countDraft, setCountDraft] = useState<number>(0);
  const [indexEditing, setIndexEditing] = useState<number[]>([]);

  // ON COMPONENT
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
  const handleFetchingDraft = async (
    setIncome?: IIncome[],
    mode: "DRAFT" | "ALL" = "DRAFT"
  ) => {
    var _clone: IIncome[] = setIncome ? setIncome : [...Incomes];
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
  const fetchingByIndex = (index: number) => {
    var _clone: IIncome[] = [...Incomes];
    setIncomes([]);
    setCountDraft(0);

    const _check = _clone[index];
    if (_check) {
      _clone[index].fetching = true;
    }

    updateSheetsIndex(_clone);
  };

  // ON CLIENT
  const onDelete = async (index: IClientIndex) => {
    const arrIndex: number | undefined = index.listIndex;
    if (arrIndex === undefined && arrIndex !== -1) {
      return;
    }

    let clone = Incomes;
    setIncomes([]);
    var incomeUpdate: IIncome[] = [];
    var data = clone[arrIndex];
    let deleted = data.delete;

    if (data) {
      //Animation
      incomeUpdate = clone.map((_, i) => {
        if (i === arrIndex) {
          _.delete = true;
        }
        return _;
      });
      if (!deleted) {
        countDraftIndex("-");
      }
      const deleteIndexEdit = indexEditing?.filter((data) => data !== arrIndex);
      setIndexEditing(deleteIndexEdit);
      updateSheetsIndex(incomeUpdate);
    } else {
      updateSheetsIndex(clone);
    }
  };
  const onExitEdit = async (index: IClientIndex) => {
    const arrIndex: number | undefined = index.listIndex;
    if (arrIndex === undefined || arrIndex === -1) {
      return;
    }
    let clone = [...Incomes];
    setIncomes([]);
    var edit = clone[arrIndex];
    edit.draft = false;
    edit.edit = false;
    edit.fetching = false;
    updateSheetsIndex(clone);
    setIndexEditing([]);
  };
  const onSelectEdit = async (
    index: IClientIndex,
    params?: IClientSelectEdit
  ) => {
    if (!params) {
      return;
    }

    const arrIndex: number | undefined = index.listIndex;
    const income: IIncome | undefined = params.income;
    const form: FormInstance<any> = params.headForm;
    const onSave: boolean | undefined = params.onSave;

    const error =
      !form || arrIndex === undefined || arrIndex === -1 || !form || !income;

    if (error) {
      setIndexEditing([]);
      return;
    }
    setIndexEditing([arrIndex]);
    let clone = [...Incomes];
    var edit = clone[arrIndex];
    clone[arrIndex] = income;
    edit = income;
    clone.map((data) => {
      if (data.delete === false) {
        data.draft = false;
        data.edit = false;
        data.fetching = false;
      }
    });

    setIncomes([]);

    if (onSave === true) {
      setIndexEditing([]);
    } else {
      edit.draft = true;
      edit.edit = true;
    }

    updateSheetsIndex(clone);

    let map = genIncomeKeyByIndex(arrIndex, edit);
    if (form) {
      form.setFieldsValue(map);
    }
  };
  const handleClientDraft = (params: IClientAddDraft) => {
    if (!params.dateSelect) {
      return;
    }
    let clone = [...Incomes];
    setIncomes([]);
    countDraftIndex("+");

    let newElement: IIncome = {
      sheetsIndex: 0,
      _priceType: "Expenses",
      day: params.dateSelect,
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
    let cloneEditIndex: number[] = [...indexEditing];
    cloneEditIndex.push(indexDraft);
    setIndexEditing(cloneEditIndex);

    setTimeout(() => {
      setIncomes(clone);
    }, 100);
  };
  const setIncomeData = (incomes: IIncome[]) => {
    if (incomes.length > 0) {
      setFirstIndex(incomes[0].sheetsIndex);
      setIncomes(incomes);
    } else {
      setIncomes([]);
      setFirstIndex(-1);
    }
  };
  const removeIncomeData = () => {
    setIncomes([]);
  };
  const resetIncome = () => {
    setFirstIndex(-1);
    setCountDraft(0);
    setIndexEditing([]);
    removeIncomeData();
  };

  // ON SERVER

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
  const setServerAdd = async (params: IClientToAddIncome) => {
    const server: ICSet | undefined = params.server;
    const date: Date | undefined = params.dateSelect;
    const incomesList: IIncome[] | undefined = params.incomes;

    const error = !server || !incomesList || !date;

    if (error) {
      setIndexEditing([]);
      return [];
    }

    let addReslut: { index: number; result: boolean }[] = [];
    let clone = [...Incomes];
    setIncomes([]);
    const data = await server.addIncome(incomesList);
    const res = data.data;
    if (res && data.success) {
      let LocalDatas: IIncome[] = [];
      res?.map((inSheets) => {
        const index = inSheets.indexOfList;
        const _check = clone[index];
        if (_check) {
          let concatData: IIncome = {
            ...clone[index],
            ...inSheets,
            draft: false,
            delete: false,
            fetching: false,
            _priceType: inSheets.expensesPrice > 0 ? "Expenses" : "Revenue",
          };
          LocalDatas.push(concatData);
          clone[index] = concatData;
          addReslut.push({
            index: index,
            result: true,
          });
        }
      });

      if (Incomes.length === 0 && res.length > 0) {
        const firstInomes = res[0];
        setFirstIndex(firstInomes.sheetsIndex);
      }

      if (date) {
        addIncomesLocal(LocalDatas, date);
      }

      updateSheetsIndex(clone, "CLOSE");
      setCountDraft(0);
      setIndexEditing([]);
    }

    return addReslut;
  };
  const setServerDelete = async (
    index: IClientIndex,
    params: IClientToServer
  ) => {
    const arrIndex: number | undefined = index.listIndex;
    const sheetsIndex: number | undefined = index.sheetsIndex;
    const server: ICSet | undefined = params.server;
    const date: Date | undefined = params.dateSelect;

    const error =
      arrIndex === undefined ||
      arrIndex === -1 ||
      !server ||
      sheetsIndex === undefined ||
      !date;

    if (error) {
      setIndexEditing([]);
      return;
    }

    fetchingByIndex(arrIndex);
    const deleted = await server.deleteIncome({
      sheetsIndex,
      sheetsDate: date,
    });
    if (deleted.data === true) {
      onDelete({ listIndex: arrIndex });
    }
  };
  const setServerEdit = async (
    // sheetsIndex: number,
    // listIndex: number,
    // dateSelect: Date,
    // headForm: FormInstance<any>,
    // server: ICSet
    index: IClientIndex,
    params: IClientToEditIncome
  ) => {
    const arrIndex: number | undefined = index.listIndex;
    const sheetsIndex: number | undefined = index.sheetsIndex;
    const server: ICSet | undefined = params.server;
    const form: FormInstance<any> | undefined = params.headForm;
    const date: Date | undefined = params.dateSelect;

    const error =
      arrIndex === undefined ||
      arrIndex === -1 ||
      !form ||
      !server ||
      sheetsIndex === undefined ||
      !date;

    if (error) {
      return;
    }

    let clone = [...Incomes];
    setIncomes([]);
    var backup: IIncome = { ...clone[arrIndex] };
    handleFetchingDraft();

    const valueUpdate = form.getFieldsValue();
    const keyUpdate = DynamicKeysToArray(valueUpdate);

    var incomeUpdate: IIncome[] = [];
    keyUpdate.map((data) => {
      const dat = hanndelInputIncome(data, date);
      incomeUpdate.push(dat);
    });

    console.log(incomeUpdate);

    if (incomeUpdate.length > 1) {
      return;
    }

    let update = incomeUpdate[0];
    update.sheetsIndex = sheetsIndex;
    const res = await server.editIncome({
      newIncome: [update],
      sheetsDateStr: date.toISOString().split("T")[0],
      sheetsIndex: sheetsIndex,
    });

    if (res) {
      onSelectEdit(
        {
          listIndex: arrIndex,
        },
        { income: update, headForm: form, onSave: true }
      );
    } else {
      onSelectEdit(
        {
          listIndex: arrIndex,
        },
        { income: backup, headForm: form }
      );
    }
  };
  const setServerMoveIndex = async (
    // incomeUpdate: IIncome[],
    // dateSelect: Date,
    // server: ICSet
    params: IClientToMoveIncome
  ) => {
    const incomesList: IIncome[] | undefined = params.incomes;
    const server: ICSet | undefined = params.server;
    const date: Date | undefined = params.dateSelect;

    const error = !incomesList || !server || !date;

    if (error) {
      return;
    }

    if (incomesList.length === 0) {
      return;
    }
    var clone: IIncome[] = [];
    [...incomesList].map((data) => {
      if (!data.delete) {
        clone.push(data);
      }
    });

    let fetch: IIncome[] = [];
    for (let index = 0; index < incomesList.length; index++) {
      let element: IIncome = { ...incomesList[index] };
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
    incomesList.map((data) => {
      if (!data.delete) {
        sheetsIndex.push(data.sheetsIndex);
      }
    });

    await server
      .moveIncome?.({
        rowIndexMove: sheetsIndex,
        sheetsDate: date.toISOString().split("T")[0],
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

  return (
    <IncomesContext.Provider
      value={{
        Incomes: Incomes,
        setIncomeData: setIncomeData,
        removeIncomeData: removeIncomeData,
        resetIncome: resetIncome,
        action: {
          handle: {
            handleClientDraft: handleClientDraft,
            handleFetchingDraft: handleFetchingDraft,
          },
          action: {
            setServerDelete: setServerDelete,
            setServerEdit: setServerEdit,
            setServerAdd: setServerAdd,
            setServerMoveIndex: setServerMoveIndex,
          },
          event: {
            onDelete: onDelete,
            onExitEdit: onExitEdit,
            onSelectEdit: onSelectEdit,
          },
        },
        valueStore: {
          countDraft: countDraft,
          firstIndexSheets: firstIndexSheets,
          indexEditing: indexEditing,
        },
      }}
    >
      <>{children}</>
    </IncomesContext.Provider>
  );
};
