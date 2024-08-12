"use client";

import { Form } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DynamicKeysToArray, hanndelInputIncome } from "./panel-lib";

import { MasterContext } from "@/contexts/master.context";
import { useCalculator } from "@/hooks/calculator-hooks";
import PanelMove from "./panel-move";
import PanelOptions from "./panel-options";
import PanelFilter from "./panel-filter";

const IncomeRender: React.FC<IPanelRender> = ({
  master,
  functions,
  headForm,
  countDraft,
  indexEditing = [],
  Set,
  dateSelect,
  incomes,
  loading,
  onFilterCategory,
  incomesFilter,
}) => {
  const action = functions?.action;
  const handle = functions?.handle;
  const event = functions?.event;

  const { Facility } = useContext(MasterContext);
  const { addIncome, removeIncome, removeAll } = useCalculator();
  //not re render
  const [_incomes, setIncomesTemp] = useState<IIncome[]>([]);
  const [_date, setDate] = useState(new Date());
  const [calculatorMode, setCalculator] = useState<boolean>(false);
  const [onMoving, setMoving] = useState<boolean>(false);

  const [closeDetail, setDateil] = useState<boolean>(false);
  const [onItemMove, setItemMove] = useState<IIncome[]>([]);

  const mappingFormKeyToIncome = (value: any): IIncome[] => {
    const d = DynamicKeysToArray(value);
    var incomes: IIncome[] = [];
    d.map((data) => {
      const dat = hanndelInputIncome(data, dateSelect);
      incomes.push(dat);
    });
    return incomes;
  };

  const onFinishSaveIncomes = (value: any) => {
    if (!action && !handle) {
      return;
    }
    const incomes = mappingFormKeyToIncome(value);
    handle!.handleFetchingDraft?.();
    action!.setServerAdd?.({
      dateSelect: dateSelect,
      incomes: incomes,
      server: Set,
    });
  };

  const setItemMoveIndex = (incomeUpdate: IIncome[] = []) => {
    setItemMove(incomeUpdate);
  };
  const onSaveItemMoveIndex = () => {
    setMoving(false);
    action?.setServerMoveIndex?.({
      dateSelect: dateSelect,
      incomes: onItemMove,
      server: Set,
    });
  };

  const onDeleteItem = async (index: IClientIndex, on: IClientOn) => {
    if (on === "SERVER") {
      action?.setServerDelete?.(index, {
        dateSelect: dateSelect,
        server: Set,
      });
    } else {
      event?.onDelete?.(index);
    }
  };

  const onSelectItem = async (index: IClientIndex, income: IIncome) => {
    event?.onSelectEdit?.(index, {
      headForm: headForm,
      income: income,
    });
  };

  const onEditItem = async (index: IClientIndex) => {
    action?.setServerEdit?.(index, {
      headForm: headForm,
      dateSelect: dateSelect,
      server: Set,
    });
  };

  const onCancalMoveIndex = () => {
    setMoving(false);
    const clone = [..._incomes];
    setIncomesTemp(clone);
  };

  const closeExpanded = () => {
    setDateil(!closeDetail);
  };

  const onFocusChange = (income: IIncome, focus: boolean) => {
    if (focus) {
      addIncome(income);
    } else {
      removeIncome(income.sheetsIndex);
    }
  };

  const onCommentChange = (income: IIncome, index: number) => {
    headForm.setFieldValue("comment_" + index, undefined);
  };

  useEffect(() => {
    if (incomes.length > 0 || dateSelect !== _date) {
      setIncomesTemp(incomes);
      setDate(dateSelect);
    }
  }, [incomes]);

  function Panel({ income }: { income: IIncome[] }) {
    return (
      <PanelMove
        cardIncome={{
          focus: calculatorMode,
          icons: Facility.iconModel,
          expanded: closeDetail,
          moving: onMoving,
          master: master,
          onFocusChange: onFocusChange,
          onCommentChange: onCommentChange,
          onExitEdit: event?.onExitEdit,
          closeExpanded: closeExpanded,
          onSaveEdit: onEditItem,
          onClickDelete: onDeleteItem,
          onClickEdit: onSelectItem,
        }}
        draggable={{
          incomes: income,
          onMoving: onMoving,
          onItemMoveing: setItemMoveIndex,
        }}
        countDraft={countDraft}
        indexEditing={indexEditing}
        dateSelect={dateSelect}
        loading={loading}
      ></PanelMove>
    );
  }

  return (
    <Form form={headForm} layout="vertical" onFinish={onFinishSaveIncomes}>
      <div key={`incom-day-${dateSelect.getDate()}`}>
        {loading.pageLoad ? (
          <div className="h-56 flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          </div>
        ) : onFilterCategory === false ? (
          <div>
            <PanelOptions
              speedDialProps={{
                disabled: indexEditing.length > 0,
                onClickMove: () => {
                  setMoving(true);
                },
                onClickCalculator: () => {
                  setCalculator(true);
                },
                cancelEvent: () => {
                  setCalculator(false);
                  onCancalMoveIndex();
                  removeAll();
                },
              }}
              headForm={headForm}
              handle={handle}
              disabled={calculatorMode || onMoving}
              countDraft={countDraft}
              indexEditing={indexEditing}
              incomes={_incomes}
              loading={loading}
              dateSelect={dateSelect}
              onCalculator={calculatorMode}
              onMoving={onMoving}
              onSaveItemMoveIndex={onSaveItemMoveIndex}
            ></PanelOptions>
            <PanelMove
              cardIncome={{
                focus: calculatorMode,
                icons: Facility.iconModel,
                expanded: closeDetail,
                moving: onMoving,
                master: master,
                onFocusChange: onFocusChange,
                onCommentChange: onCommentChange,
                onExitEdit: event?.onExitEdit,
                closeExpanded: closeExpanded,
                onSaveEdit: onEditItem,
                onClickDelete: onDeleteItem,
                onClickEdit: onSelectItem,
              }}
              draggable={{
                incomes: _incomes,
                onMoving: onMoving,
                onItemMoveing: setItemMoveIndex,
              }}
              countDraft={countDraft}
              indexEditing={indexEditing}
              dateSelect={dateSelect}
              loading={loading}
            ></PanelMove>
          </div>
        ) : (
          <PanelFilter
            cardIncome={{
              focus: calculatorMode,
              icons: Facility.iconModel,
              expanded: closeDetail,
              moving: onMoving,
              master: master,
              onFocusChange: onFocusChange,
              onCommentChange: onCommentChange,
              onExitEdit: event?.onExitEdit,
              closeExpanded: closeExpanded,
              onSaveEdit: onEditItem,
              onClickDelete: onDeleteItem,
              onClickEdit: onSelectItem,
            }}
            draggable={{
              incomes: [],
              onMoving: onMoving,
              onItemMoveing: setItemMoveIndex,
            }}
            countDraft={countDraft}
            indexEditing={indexEditing}
            dateSelect={dateSelect}
            loading={loading}
            incomesFilter={incomesFilter}
          ></PanelFilter>
        )}
      </div>
    </Form>
    // incomesFilter?.map((data, index) => {
    //   return (
    //     <div key={`incomes-filter-${index}`}>
    //       <div>{data.key}</div>
    //       <div>
    //         <Panel income={data.income}></Panel>
    //       </div>
    //     </div>
    //   );
    // })
  );
};

export default IncomeRender;
