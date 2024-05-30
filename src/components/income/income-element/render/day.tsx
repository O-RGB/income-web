import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface RenderDayProps {
  day: number;
  _priceType: priceType;
  loading: boolean;
}

const RenderDay: React.FC<RenderDayProps> = ({ day, _priceType, loading }) => {
  return (
    <>
      <div
        className={`${
          loading
            ? "bg-gray-500"
            : _priceType === "Expenses"
            ? "bg-red-400"
            : "bg-green-500"
        } w-8 h-8 flex justify-center items-center  rounded-full text-white font-bold`}
      >
        {loading ? (
          <AiOutlineLoading className="animate-spin font-bold"></AiOutlineLoading>
        ) : (
          day
        )}
      </div>
    </>
  );
};

export default RenderDay;
