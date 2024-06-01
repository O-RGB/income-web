import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { VscIssueDraft } from "react-icons/vsc";

interface RenderDayProps {
  day: number;
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
        {state === "loading" ? (
          <AiOutlineLoading className="animate-spin font-bold"></AiOutlineLoading>
        ) : state === "draft" ? (
          <VscIssueDraft className="text-2xl font-bold  ml-0.5"></VscIssueDraft>
        ) : (
          day
        )}
      </div>
    </div>
  );
};

export default RenderDay;
