import { DateFormat } from "@/libs/date-lib";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { VscIssueDraft } from "react-icons/vsc";

interface RenderDayProps {
  day: Date;
  _priceType?: priceType;
  state?: "loading" | "draft";
}

const RenderDay: React.FC<RenderDayProps> = ({
  day,
  _priceType = "Expenses",
  state,
}) => {
  return (
    <div>
      <div
        className={`${
          state === "loading"
            ? "bg-gray-500"
            : state === "draft"
            ? "bg-amber-400"
            : _priceType === "Expenses"
            ? "bg-red-400"
            : "bg-green-500"
        } w-8 h-8 flex justify-center items-center rounded-full text-white font-bold`}
      >
        {
          state === "loading" ? (
            <AiOutlineLoading className="animate-spin font-bold"></AiOutlineLoading>
          ) : state === "draft" ? (
            <VscIssueDraft className="text-2xl font-bold  ml-0.5"></VscIssueDraft>
          ) : _priceType === "Expenses" ? (
            <TiArrowSortedDown className="text-white text-lg"></TiArrowSortedDown>
          ) : (
            <TiArrowSortedUp className="text-white text-lg"></TiArrowSortedUp>
          )
          // DateFormat(day, "D")
        }
      </div>
    </div>
  );
};

export default RenderDay;
