import InputCommon from "@/components/common/input";
import SelectCommon from "@/components/common/select";
import { Form, Input } from "antd";
import React, { useEffect } from "react";
import "./label.css"

interface IncomeInputTypesProps {
  name: string;
  lable: string;
  options: RadioOptions[];
}

const IncomeInputTypes: React.FC<IncomeInputTypesProps> = ({
  name,
  lable,
  options,
}) => {
  return (
    <>
      <Form.Item
        rules={[{ required: true }]}
        name={name}
        className="m-0 w-full remove-lable"
        label={<div className="text-xs !mb-1">{lable}</div>}
        initialValue={"T00"}
      >
        <SelectCommon options={options} placeholder={lable} />
      </Form.Item>
    </>
  );
};

export default IncomeInputTypes;
