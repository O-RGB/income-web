import InputCommon from "@/components/common/input";
import SelectCommon from "@/components/common/select";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import "./label.css";
import ButtomSheets from "@/components/common/buttomSheets";
import Category from "@/components/category";

interface IncomeInputTypesProps {
  // name: string;
  // lable: string;
  options: IIncomeTypes[];
  value?: string;
  onChange?: (value: IIncomeTypes) => void;
}

const IncomeInputTypes: React.FC<IncomeInputTypesProps> = ({
  // name,
  // lable,
  options,
  value,
  onChange,
}) => {
  const [buttom, setButtom] = useState<boolean>(false);
  const [selectValue, setValue] = useState<IIncomeTypes>();
  const onSelectCate = (value: IIncomeTypes) => {
    setValue(value);
    onChange?.(value);
    setButtom(false);
  };
  useEffect(() => {
    if (options) {
      const find = options.find((x) => x.typeId === value);
      if (find) {
        setValue(find);
      }
    }
  }, [value]);
  return (
    <>
      <ButtomSheets
        onClose={() => {
          setButtom(false);
        }}
        isOpen={buttom}
      >
        <Category
          onSelectCate={onSelectCate}
          selectValue={selectValue?.typeId}
          options={options}
        ></Category>
      </ButtomSheets>
      <Button
        size="small"
        type={selectValue?.typeId !== "T00" ? "primary" : "default"}
        onClick={() => {
          setButtom(true);
        }}
      >
        <div className="text-xs">{selectValue?.name}</div>
      </Button>
    </>
  );
  return <>{/* <SelectCommon options={options} placeholder={lable} /> */}</>;
};

export default IncomeInputTypes;
