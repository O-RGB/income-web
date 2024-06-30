import { HexToRgba } from "@/libs/color";
import { MapingTypeToLabel } from "@/libs/income-lib";
import { IconsModel, IconsModelList } from "@/utils/models/icons";
import { Mali } from "next/font/google";
import React, { useEffect, useState } from "react";
const inter = Mali({ subsets: ["thai"], weight: "300" });

interface RenderTypeProps {
  types: string;
  comment?: React.ReactNode;
  _priceType?: priceType;
  typesOfItems?: IIncomeTypes[];
  icons: IconsModelList;
}

const RenderType: React.FC<RenderTypeProps> = ({
  types,
  comment,
  _priceType = "Expenses",
  typesOfItems,
  icons,
}) => {
  const [typeLable, setTypeLabel] = useState<{
    type: IIncomeTypes;
    icon: IconsModel;
  }>();

  useEffect(() => {
    if (types) {
      const data = typesOfItems?.find((x) => x.typeId === types);
      if (data) {
        const ele = icons.getIconById(data.icons);
        if (ele) {
          setTypeLabel({
            type: data,
            icon: ele,
          });
        }
      }
    }
  }, [typesOfItems, types]);
  return (
    <div className="  ">
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
              // style={{
              //   backgroundColor: HexToRgba(typeLable.type.color, 0.1),
              //   color: typeLable.type.color,
              // }}
              className={`text-[10px] px-1 w-fit rounded-md text-nowrap flex gap-1 items-center`}
            >
              {/* <div
                className="text-base"
                style={{ color: typeLable.type.color }}
              >
                {typeLable.icon.render}
              </div> */}
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              <div>{typeLable.type.name}</div>
            </div>
          )}
          <span className={`${inter.className}`}>{comment}</span>
        </div>
      )}
    </div>
  );
};

export default RenderType;
