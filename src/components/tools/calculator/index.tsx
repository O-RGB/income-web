import Calculator from "@/components/common/calculator";
import CalculatorModals from "@/components/modals/calculator/calculator";
import { useCalculator } from "@/hooks/calculator-hooks";
import { NumberFormat } from "@/libs/number";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { TbCalculatorFilled } from "react-icons/tb";

interface CalculatorMethodProps {
  show?: boolean;
  openOnlyModals?: boolean;
  onModalsClose?: () => void;
}

const CalculatorMethod: React.FC<CalculatorMethodProps> = ({
  show = true,
  openOnlyModals = false,
  onModalsClose,
}) => {
  const { Price } = useCalculator();
  const [expend, setExpend] = useState<boolean>(false);

  const expendClose = () => {
    setExpend(false);
    onModalsClose?.();
  };
  useEffect(() => {}, [openOnlyModals]);

  if (!show) {
    return <></>;
  }
  return (
    <>
      <CalculatorModals
        open={expend || openOnlyModals}
        onClose={expendClose}
      ></CalculatorModals>
      <div className="fixed z-30 bottom-9  left-6 flex gap-2  text-white">
        <div className="  h-full p-1  px-3  text-xl flex items-center justify-center bg-orange-400   rounded-md shadow-md ">
          {NumberFormat(Price)}
        </div>
        <div
          onClick={() => {
            setExpend(!expend);
          }}
          className="flex items-center justify-center bg-red-400 hover:bg-red-300 duration-300 rounded-md shadow-md px-2 "
        >
          <TbCalculatorFilled className="text-lg"></TbCalculatorFilled>
        </div>
      </div>
    </>
  );
};

export default CalculatorMethod;
