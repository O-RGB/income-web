import { NumberFormat } from "@/libs/number";
import { Mali } from "next/font/google";
import React from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
const inter = Mali({ subsets: ["thai"], weight: "500" });

interface RenderPriceProps {
  _priceType?: priceType;
  expensesPrice: number | string;
  revenuePrice: number | string;
  colorTheme: ColorTheme;
}

const RenderPrice: React.FC<RenderPriceProps> = ({
  _priceType = "Expenses",
  expensesPrice,
  revenuePrice,
  colorTheme,
}) => {
  return (
    <>
      <div className={`text-xl font-bold flex gap-2 items-center ${inter.className}`}>
        {_priceType == "Expenses" ? (
          <div className={`${colorTheme?.text}`}>
            {NumberFormat(expensesPrice)}
          </div>
        ) : (
          <div className={`${colorTheme?.text}`}>
            {NumberFormat(revenuePrice)}
          </div>
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
