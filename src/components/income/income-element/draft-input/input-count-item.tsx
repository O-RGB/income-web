import InputNumberCommon from "@/components/common/inputNumber";
import { Form, Input } from "antd";
import React, { useEffect } from "react";
import "./label.css";
interface IncomeInputCountItemProps {
  name: string;
  lable: string;
}

const IncomeInputCountItem: React.FC<IncomeInputCountItemProps> = ({
  name,
  lable,
}) => {
  return (
    <>
      <Form.Item
        rules={[{ required: true }]}
        name={name}
        className="m-0 w-full"
        // label={lable}
        initialValue={1}
        label={<div className="text-xs !mb-1">{lable}</div>}
      >
        <InputNumberCommon
          inputMode="numeric"
          placeholder={lable}
          min={1}
          max={100}
        />
      </Form.Item>
    </>
  );
};

export default IncomeInputCountItem;
