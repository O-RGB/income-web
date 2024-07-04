import { NumberFormat } from "@/libs/number";
import React, { ReactNode } from "react";

interface CategoryIconsProps {
  render?: ReactNode;
  price?: number;
  loading?: boolean;
}

const CategoryIcons: React.FC<CategoryIconsProps> = ({
  render,
  price,
  loading = false,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
        <div
          className={`${
            loading ? "animate-pulse bg-white/50" : "bg-white/70"
          } w-10 h-10 rounded-full overflow-hidden  flex items-center justify-center`}
        >
          <div className={`w-7 h-7`}>{render}</div>
        </div>
      </div>
      <div className="text-xs">
        {price ? (
          NumberFormat(price)
        ) : (
          <div className="relative h-full w-full">
            <div className="absolute -right-[17px] top-[3px] rounded-md bg-white/30 animate-pulse h-2.5 w-8"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryIcons;
