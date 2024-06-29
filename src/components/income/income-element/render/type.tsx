import { MapingTypeToLabel } from "@/libs/income-lib";
import React, { useEffect, useState } from "react";

interface RenderTypeProps {
  types: string;
  comment?: React.ReactNode;
  _priceType?: priceType;
  typesOfItems?: IIncomeTypes[];
}

const RenderType: React.FC<RenderTypeProps> = ({
  types,
  comment,
  _priceType = "Expenses",
  typesOfItems,
}) => {
  const [typeLable, setTypeLabel] = useState<string>();

  useEffect(() => {
    if (types) {
      const data = MapingTypeToLabel(typesOfItems, types);
      setTypeLabel(data);
    }
  }, [typesOfItems, types]);
  return (
    <>
      {types && types.trim().length > 0 && (
        <div
          className={`flex flex-row gap-2 w-full ${
            _priceType == "Expenses"
              ? "pl-[2.7rem]"
              : "pr-[2.7rem] flex-row-reverse  "
          } `}
        >
          {typeLable && (
            <div
              className={`${
                _priceType === "Expenses" ? "bg-red-400" : "bg-green-500"
              } text-xs p-1 border text-white  w-fit rounded-md text-nowrap`}
            >
              {typeLable}
            </div>
          )}
          {comment}
        </div>
      )}
    </>
  );
};

export default RenderType;
