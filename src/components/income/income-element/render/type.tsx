import React from "react";

interface RenderTypeProps {
  types: string;
  _priceType?: priceType;
}

const RenderType: React.FC<RenderTypeProps> = ({
  types,
  _priceType = "Expenses",
}) => {
  return (
    <>
      {types && types.trim().length > 0 && (
        <div
          className={`flex ${
            _priceType == "Expenses" ? "pl-[2.7rem]" : "pr-[2.7rem] justify-end"
          } `}
        >
          <div
            className={`${
              _priceType === "Expenses" ? "bg-red-400" : "bg-green-500"
            } text-xs p-1 border text-white  w-fit rounded-md`}
          >
            {types}
          </div>
        </div>
      )}
    </>
  );
};

export default RenderType;
