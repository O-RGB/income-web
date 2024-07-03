import { Mali } from "next/font/google";
import React from "react";


interface RenderNameProps {
  name: string;
  _priceType?: priceType;
  colorTheme?: ColorTheme;
}

const RenderName: React.FC<RenderNameProps> = ({
  name,
  _priceType = "Expenses",
  colorTheme,
}) => {
  return (
    <>
      <div
        className={`${
          _priceType === "Expenses" ? "" : "text-end"
        }  w-[80%] ${colorTheme?.text}`}
      >
        {name}
      </div>
    </>
  );
};

export default RenderName;
