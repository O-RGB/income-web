import { NumberFormat } from "@/libs/number";
import React from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

interface RenderPriceProps {
  _priceType?: priceType;
  expensesPrice: number | string;
  revenuePrice: number | string;
}

const RenderPrice: React.FC<RenderPriceProps> = ({
  _priceType = "Expenses",
  expensesPrice,
  revenuePrice,
}) => {
  return (
    <>
      <div className="text-xl font-bold flex gap-2 items-center">
        {_priceType == "Expenses" ? (
          <div>{NumberFormat(expensesPrice)}</div>
        ) : (
          <div>{NumberFormat(revenuePrice)}</div>
        )}

        <div className="text-lg font-bold text-gray-400 opacity-50">
          {_priceType == "Expenses" ? (
            <TiArrowSortedDown className="text-red-500"></TiArrowSortedDown>
          ) : (
            <TiArrowSortedUp className="text-green-500"></TiArrowSortedUp>
          )}
        </div>
      </div>
    </>
  );
};

export default RenderPrice;
