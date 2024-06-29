import React, { useEffect, useState } from "react";
import InputCommon from "../common/input";
import { Button, ColorPicker } from "antd";
import { FaCheck, FaEdit, FaSave, FaStepBackward } from "react-icons/fa";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IconsModelList } from "@/utils/models/icons";

interface CateSelectProps {
  value: IIncomeTypes;
  index: number;
  selectValue?: string;
  onSelectCate?: (cate: IIncomeTypes) => void;
  editMode?: boolean;
}

const CateSelect: React.FC<CateSelectProps> = ({
  value,
  index,
  selectValue,
  onSelectCate,
  editMode,
}) => {
  const [onAction, setAction] = useState<boolean>(false);
  const [renderIcon, setIcon] = useState<React.ReactNode>();
  useEffect(() => {
    const icons = new IconsModelList();
    const data = icons.getIconById(value.icons);
    const i = data?.getIcon();
    setIcon(i);
  }, [value]);

  if ((onAction && index > 0) || editMode) {
    return (
      <div className="flex gap-2 relative rounded-md text-sm border p-2">
        <ColorPicker></ColorPicker>
        <InputCommon size="middle" value={value.name}></InputCommon>
        <Button
          className="!w-14"
          type="primary"
          icon={<FaSave></FaSave>}
          onClick={() => {
            setAction(true);
          }}
        ></Button>
        <Button
          className="!w-14"
          type="default"
          icon={<RiArrowGoBackLine></RiArrowGoBackLine>}
          onClick={() => {
            setAction(false);
          }}
        ></Button>
      </div>
    );
  } else {
    return (
      <div className="flex gap-1">
        <div
          onClick={() => {
            onSelectCate?.(value);
          }}
          className={`${
            selectValue === value.typeId ? "bg-gray-200" : ""
          } flex gap-2 w-full relative z-10 items-center justify-between hover:bg-slate-50 rounded-md text-sm  p-1.5 cursor-pointer duration-300`}
        >
          <div className="flex gap-3 items-center">
            <div
              style={{ backgroundColor: value.color }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white  ${
                index === 0 ? "bg-gray-200" : "bg-orange-200"
              }`}
            >
              {renderIcon}
              {/* {selectValue === value.typeId && (
                <FaCheck className="text-gray-500"></FaCheck>
              )} */}
            </div>
            <div className={`${index === 0 ? "text-gray-400" : ""}`}>
              {value.name}
            </div>
          </div>
        </div>
        {/* {index > 0 && (
          <Button
            size="large"
            icon={<FaEdit></FaEdit>}
            onClick={(e) => {
              setAction(true);
              e.preventDefault();
            }}
          ></Button>
        )} */}
      </div>
    );
  }
};

export default CateSelect;