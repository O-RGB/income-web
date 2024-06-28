import React, { useState } from "react";
import InputCommon from "../common/input";
import { Button, ColorPicker } from "antd";
import { FaCheck, FaEdit, FaSave, FaStepBackward } from "react-icons/fa";
import { RiArrowGoBackLine } from "react-icons/ri";

interface CateSelectProps {
  value: string;
  label: string;
  index: number;
  selectValue?: string;
  onSelectCate?: (cate: RadioOptions) => void;
}

const CateSelect: React.FC<CateSelectProps> = ({
  label,
  value,
  index,
  selectValue,
  onSelectCate,
}) => {
  const [onAction, setAction] = useState<boolean>(false);

  if (onAction && index > 0) {
    return (
      <div className="flex gap-2 relative rounded-md text-sm border p-2">
        <InputCommon size="middle" value={label}></InputCommon>
        <Button
          type="primary"
          icon={<FaSave></FaSave>}
          onClick={() => {
            setAction(true);
          }}
        ></Button>
        <Button
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
            onSelectCate?.({ label: label, value: value });
          }}
          className="flex gap-2 w-full relative z-10 items-center justify-between hover:bg-slate-50 rounded-md text-sm  p-1.5 cursor-pointer duration-300"
        >
          <div className="flex gap-3 items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center  ${
                index === 0 ? "bg-gray-200" : "bg-orange-200"
              }`}
            >
              {selectValue === value && (
                <FaCheck className="text-gray-500"></FaCheck>
              )}
            </div>
            <div className={`${index === 0 ? "text-gray-400" : ""}`}>
              {label}
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
