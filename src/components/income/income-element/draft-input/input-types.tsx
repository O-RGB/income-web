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
  options: RadioOptions[];
  value?: string;
  onChange?: (value: string) => void;
}

const IncomeInputTypes: React.FC<IncomeInputTypesProps> = ({
  // name,
  // lable,
  options,
  value,
  onChange,
}) => {
  const [buttom, setButtom] = useState<boolean>(false);
  const [selectValue, setValue] = useState<RadioOptions>();
  const onSelectCate = (value: RadioOptions) => {
    setValue(value);
    onChange?.(value.value);
    setButtom(false);
  };
  useEffect(() => {
    if (options) {
      const find = options.find((x) => x.value === value);
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
          selectValue={selectValue?.value}
          options={options}
        ></Category>
      </ButtomSheets>
      <Button
        size="small"
        type={selectValue?.value !== "T00" ? "primary" : "default"}
        onClick={() => {
          setButtom(true);
        }}
      >
        <div className="text-xs">{selectValue?.label}</div>
      </Button>
    </>
  );
  return <>{/* <SelectCommon options={options} placeholder={lable} /> */}</>;
};

export default IncomeInputTypes;
