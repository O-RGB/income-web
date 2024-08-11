"use client";

import { Form, FormInstance } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import IncomeElement from "../../../tools/card-income";
import { DynamicKeysToArray, hanndelInputIncome } from "./im-lib";
import { FaSave } from "react-icons/fa";

import { BiLayerPlus } from "react-icons/bi";
import FloatingButton from "@/components/common/floating-button";
import { MasterContext } from "@/contexts/master.context";
import SpeedDial from "@/components/tools/speed-dial/speedDial";
import { useCalculator } from "@/hooks/calculator-hooks";
import CalculatorMethod from "@/components/tools/calculator";
import Draggable from "@/components/tools/dnd";
import ButtonCommon from "@/components/common/button";

interface IncomeRenderProps {
  master: IMasterDataImcomes;
  dateSelect: Date;
  incomes: IIncome[];
  loading: ILoading;
  functions?: IClientActionIncomes;
  headForm: FormInstance<any>;
  draftCount: number;
  indexEdit?: number[];
  Set: ICSet;
}

const IncomeRender: React.FC<IncomeRenderProps> = ({
  master,
  dateSelect,
  incomes,
  loading,
  functions,
  headForm,
  draftCount,
  indexEdit = [],
  Set,
}) => {
  const action = functions?.action;
  const handle = functions?.handle;
  const event = functions?.event;

  const { Facility } = useContext(MasterContext);
  const { addIncome, removeIncome, removeAll } = useCalculator();
  //not re render
  const [_incomes, setIncomesTemp] = useState<IIncome[]>([]);
  const [_date, setDate] = useState(new Date());
  const [onClickCalculator, setCalculator] = useState<boolean>(false);
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
    console.log(on)
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

  useEffect(() => {
    if (incomes.length > 0 || dateSelect !== _date) {
      setIncomesTemp(incomes);
      setDate(dateSelect);
    }
  }, [incomes]);

  return (
    <Form form={headForm} layout="vertical" onFinish={onFinishSaveIncomes}>
      <div key={`incom-day-${dateSelect.getDate()}`}>
        {loading.pageLoad ? (
          <div className="h-56 flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          </div>
        ) : (
          <div>
            <div>
              <div className="w-full flex justify-between items-center ">
                <div></div>

                <div className="flex gap-2">
                  {draftCount > 0 ? (
                    <FloatingButton
                      disabled={onClickCalculator}
                      noti={draftCount > 0 ? String(draftCount) : undefined}
                      color="bg-green-500"
                      hoverColor="hover:bg-green-400"
                      icon={<FaSave className="text-lg"></FaSave>}
                      right="6rem"
                      onClick={() => headForm.submit()}
                    ></FloatingButton>
                  ) : (
                    <SpeedDial
                      disabled={indexEdit.length > 0}
                      onClickMove={() => {
                        setMoving(true);
                      }}
                      onClickCalculator={() => {
                        setCalculator(true);
                      }}
                      cancelEvent={() => {
                        setCalculator(false);
                        onCancalMoveIndex();
                        removeAll();
                      }}
                    ></SpeedDial>
                  )}

                  <FloatingButton
                    disabled={onClickCalculator || onMoving}
                    icon={
                      draftCount > 0 ? (
                        <BiLayerPlus className="text-xl"></BiLayerPlus>
                      ) : (
                        <FaPlus className="text-lg"></FaPlus>
                      )
                    }
                    onClick={() => {
                      if (!loading.waitActioning) {
                        handle!.handleClientDraft?.({
                          dateSelect: dateSelect,
                        });
                      }
                    }}
                  ></FloatingButton>
                </div>
              </div>
            </div>
            {_incomes.length === 0 && (
              <div className="text-xs flex w-full justify-center items-center h-40">
                <div className="p-3 rounded-md bg-white/50 text-gray-800">
                  ไม่มีข้อมูล
                </div>
              </div>
            )}
            <CalculatorMethod show={onClickCalculator}></CalculatorMethod>
            {onMoving && (
              <div className="fixed z-30 bottom-9 left-6 text-white">
                <ButtonCommon
                  onClick={onSaveItemMoveIndex}
                  icon={<FaSave></FaSave>}
                  color="bg-green-500"
                >
                  Save
                </ButtonCommon>
              </div>
            )}
            <Draggable
              incomes={_incomes}
              onMoving={onMoving}
              onItemMoveing={setItemMoveIndex}
              className="flex flex-col-reverse pb-32"
              renderItem={(node, jindex) => {
                return (
                  <div key={`incom-${dateSelect.getDate()}-${jindex}`}>
                    <IncomeElement
                      expanded={closeDetail}
                      closeExpanded={closeExpanded}
                      moving={onMoving}
                      disabled={
                        indexEdit?.length > 0
                          ? !indexEdit.includes(jindex)
                          : undefined
                      }
                      onFocusChange={(income, fs) => {
                        if (fs) {
                          addIncome(income);
                        } else {
                          removeIncome(income.sheetsIndex);
                        }
                      }}
                      focus={onClickCalculator}
                      icons={Facility.iconModel}
                      onCommentChange={(_, index) => {
                        headForm.setFieldValue("comment_" + index, undefined);
                      }}
                      lockAction={
                        loading.waitActioning ? loading.waitActioning : false
                      }
                      master={master}
                      itemIndex={jindex}
                      income={node}
                      onExitEdit={event?.onExitEdit}
                      onSaveEdit={onEditItem}
                      // onSelectEdit={onSelectItem}
                      // onDelete={onDeleteItem}
                      onClickDelete={onDeleteItem}
                      onClickEdit={onSelectItem}
                    ></IncomeElement>
                  </div>
                );
              }}
            ></Draggable>
          </div>
        )}
      </div>
    </Form>
  );
};

export default IncomeRender;
