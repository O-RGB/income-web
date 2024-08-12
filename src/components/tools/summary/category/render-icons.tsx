import { NumberFormat } from "@/libs/number";
import React, { ReactNode } from "react";
import { BiCloset } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";

interface CategoryIconsProps {
  render?: ReactNode;
  price?: number;
  loading?: boolean;
  onClick?: () => void;
  active?: boolean;
}

const CategoryIcons: React.FC<CategoryIconsProps> = ({
  render,
  price,
  loading = false,
  active = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer"
    >
      <div
        className={`p-[3px] border-2  rounded-full relative ${
          active ? "border-blue-500/60" : "border-white/30"
        }`}
      >
        <div
          className={`absolute z-50 -top-0 -right-0 ${
            active ? "opacity-100" : "opacity-0"
          } duration-100`}
        >
          <FaPlus className="rotate-45  p-1 bg-red-500 text-white rounded-full"></FaPlus>
        </div>

        <div
          className={`${
            loading
              ? "animate-pulse bg-white/50"
              : active
              ? "bg-blue-500/10"
              : "bg-white/70"
          } w-[45px] h-[45px] rounded-full overflow-hidden flex items-center justify-center relative duration-300`}
        >
          <div className="scale-110">{render}</div>
        </div>
      </div>
      <div className="text-xs">
        {price ? (
          NumberFormat(price)
        ) : (
          <div className="relative h-full w-full">
            <div
              className={`absolute -right-[16px] top-[3px] rounded-md  animate-pulse h-2.5 w-8 bg-white/30`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryIcons;
