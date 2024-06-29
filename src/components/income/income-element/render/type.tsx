import { MapingTypeToLabel } from "@/libs/income-lib";
import { IconsModel, IconsModelList } from "@/utils/models/icons";
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
  const [typeLable, setTypeLabel] = useState<{
    type: IIncomeTypes;
    icon: IconsModel;
  }>();

  useEffect(() => {
    if (types) {
      const data = typesOfItems?.find((x) => x.typeId === types);
      if (data) {
        const icone = new IconsModelList();
        const ele = icone.getIconById(data.icons);
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
              style={{
                backgroundColor: typeLable.type.color,
              }}
              className={` text-xs p-1 font-bold text-white  w-fit rounded-md text-nowrap flex gap-0.5 items-center`}
            >
              <div>{typeLable.icon.render}</div>
              <div>{typeLable.type.name}</div>
            </div>
          )}
          {comment}
        </div>
      )}
    </>
  );
};

export default RenderType;
