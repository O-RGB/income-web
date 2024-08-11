import { HexToRgba } from "@/libs/color";
import { IconsModel, IconsModelList } from "@/utils/models/icons";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { VscIssueDraft } from "react-icons/vsc";

interface RenderDayProps {
  day: Date;
  _priceType?: priceType;
  state?: "loading" | "draft";
  colorTheme: ColorTheme;
  types: string;
  typesOfItems?: IIncomeTypes[];
  icons?: IconsModelList;
}

const RenderDay: React.FC<RenderDayProps> = ({
  day,
  _priceType = "Expenses",
  state,
  colorTheme,
  typesOfItems,
  types,
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
        const ele = icons?.getIconById(data.icons);
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
    <div>
      <div
        style={
          typeLable?.icon.render
            ? undefined
            : {
                backgroundColor: HexToRgba(colorTheme.color, 0.1),
                color: HexToRgba(colorTheme.color, 1),
              }
        }
        className={`${
          state === "loading"
            ? "bg-gray-500"
            : state === "draft"
            ? "bg-amber-400"
            : ""
        } w-8 h-8 flex justify-center items-center rounded-full text-white font-bold`}
      >
        {
          state === "loading" ? (
            <AiOutlineLoading className="animate-spin font-bold"></AiOutlineLoading>
          ) : state === "draft" ? (
            <VscIssueDraft className="text-2xl font-bold  ml-0.5"></VscIssueDraft>
          ) : typeLable ? (
            <div className="text-lg">{typeLable.icon.render}</div>
          ) : _priceType === "Expenses" ? (
            <TiArrowSortedDown className="text-lg"></TiArrowSortedDown>
          ) : (
            <TiArrowSortedUp className="text-lg"></TiArrowSortedUp>
          )
          // DateFormat(day, "D")
        }
      </div>
    </div>
  );
};

export default RenderDay;
