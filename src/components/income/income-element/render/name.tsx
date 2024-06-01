import React from "react";

interface RenderNameProps {
  name: string;
  _priceType?: priceType;
}

const RenderName: React.FC<RenderNameProps> = ({
  name,
  _priceType = "Expenses",
}) => {
  return (
    <>
      <div
        className={`${
          _priceType === "Expenses" ? "" : "text-end"
        } text-lg font-bold w-[80%]`}
      >
        {name}
      </div>
    </>
  );
};

export default RenderName;
