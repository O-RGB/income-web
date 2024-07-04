
import React, { useEffect } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import RenderDay from "./day";
import RenderName from "./name";
import RenderPrice from "./price";
import RenderType from "./type";
import { IconsModelList } from "@/utils/models/icons";

interface RenderIncomeCardProps {
  income: IIncome;
  onClick?: () => void;
  isDraft: boolean;
  icons?: IconsModelList;
  master: IMasterDataImcomes;
  colorTheme: ColorTheme;
  loading: boolean;
}

const RenderIncomeCard: React.FC<RenderIncomeCardProps> = ({
  onClick,
  isDraft,
  income,
  icons,
  master,
  colorTheme,
  loading,
}) => {
  return (
    <>
      <div
        onClick={isDraft == true ? () => {} : onClick}
        className={`flex cursor-pointer ${
          income._priceType == "Expenses" ? "flex-row" : "flex-row-reverse"
        } justify-between items-start `}
      >
        <div className="w-full">
          <div
            className={`flex ${
              income._priceType == "Expenses" ? "flex-row" : "flex-row-reverse"
            } gap-3 items-center w-full`}
          >
            <RenderDay
              icons={icons}
              typesOfItems={master.typesOfItems}
              types={income.types}
              colorTheme={colorTheme}
              state={loading ? "loading" : undefined}
              _priceType={income._priceType}
              day={income.day}
            ></RenderDay>
            <RenderName
              colorTheme={colorTheme}
              _priceType={income._priceType}
              name={income.name}
            ></RenderName>
          </div>

          <div>
            <RenderType
              icons={icons}
              typesOfItems={master.typesOfItems}
              comment={
                income.comment && (
                  <div className="line-clamp-1 opacity-50 text-[10px] flex gap-1 items-center">
                    <span>
                      <MdOutlineEditNote></MdOutlineEditNote>
                    </span>
                    <span>{income.comment}</span>
                  </div>
                )
              }
              _priceType={income._priceType}
              types={income.types}
            ></RenderType>
          </div>
        </div>
        <div className={`flex gap-2 items-start `}>
          <RenderPrice
            colorTheme={colorTheme}
            _priceType={income._priceType}
            expensesPrice={income.expensesPrice}
            revenuePrice={income.revenuePrice}
          ></RenderPrice>
        </div>
      </div>
    </>
  );
};

export default RenderIncomeCard;
