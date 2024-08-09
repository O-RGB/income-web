import InputCommon from "@/components/common/input";
import SelectCommon from "@/components/common/select";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import "./label.css";

interface IncomeInputTypesProps {
  options: IIncomeTypes[];
  category?: string;
  onChange?: (value: IIncomeTypes) => void;
  onClick?: () => void;
}

const IncomeInputTypes: React.FC<IncomeInputTypesProps> = ({
  options,
  category,
  onClick,
  onChange,
}) => {
  const [selectValue, setValue] = useState<IIncomeTypes>();

  useEffect(() => {
    if (options) {
      const find = options.find((x) => x.typeId === category);
      if (find) {
        setValue(find);
        onChange?.(find);
      }
    }
  }, [category]);
  return (
    <>
      <Button
        size="small"
        type={selectValue?.typeId !== "T00" ? "primary" : "default"}
        onClick={onClick}
      >
        <div className="text-xs">{selectValue ? selectValue.name : "ไม่กำหนด"}</div>
      </Button>
    </>
  );
};

export default IncomeInputTypes;
