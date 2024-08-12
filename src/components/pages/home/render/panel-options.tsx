import ButtonCommon from "@/components/common/button";
import FloatingButton from "@/components/common/floating-button";
import CalculatorMethod from "@/components/tools/calculator";
import SpeedDial from "@/components/tools/speed-dial/speedDial";
import React from "react";
import { BiLayerPlus } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const PanelOptions: React.FC<IPanelOptions> = ({
  speedDialProps,
  incomes,
  loading,
  ...props
}) => {
  return (
    <>
      <div>
        <div className="w-full flex justify-between items-center ">
          <div className="flex gap-2">
            {props.countDraft > 0 ? (
              <FloatingButton
                disabled={props.disabled}
                noti={
                  props.countDraft > 0 ? String(props.countDraft) : undefined
                }
                color="bg-green-500"
                hoverColor="hover:bg-green-400"
                icon={<FaSave className="text-lg"></FaSave>}
                right="6rem"
                onClick={() => props.headForm.submit()}
              ></FloatingButton>
            ) : (
              <SpeedDial {...speedDialProps}></SpeedDial>
            )}

            <FloatingButton
              disabled={props.disabled}
              icon={
                props.countDraft > 0 ? (
                  <BiLayerPlus className="text-xl"></BiLayerPlus>
                ) : (
                  <FaPlus className="text-lg"></FaPlus>
                )
              }
              onClick={() => {
                if (!loading.waitActioning) {
                  props.handle!.handleClientDraft?.({
                    dateSelect: props.dateSelect,
                  });
                }
              }}
            ></FloatingButton>
          </div>
        </div>
      </div>
      {incomes.length === 0 && (
        <div className="text-xs flex w-full justify-center items-center h-40">
          <div className="p-3 rounded-md bg-white/50 text-gray-800">
            ไม่มีข้อมูล
          </div>
        </div>
      )}
      <CalculatorMethod show={props.onCalculator}></CalculatorMethod>
      {props.onMoving && (
        <div className="fixed z-30 bottom-9 left-6 text-white">
          <ButtonCommon
            onClick={props.onSaveItemMoveIndex}
            icon={<FaSave></FaSave>}
            color="bg-green-500"
          >
            Save
          </ButtonCommon>
        </div>
      )}
    </>
  );
};

export default PanelOptions;
