import InputNumberCommon from "@/components/common/inputNumber";
import { Form, Input } from "antd";
import React, { useEffect } from "react";
import "./label.css"
interface IncomeInputPriceProps {
  name: string;
  lable: string;
}

const IncomeInputPrice: React.FC<IncomeInputPriceProps> = ({ name, lable }) => {
  return (
    <>
      <Form.Item
        rules={[{ required: true }]}
        name={name}
        className="m-0 w-full"
        label={<div className="text-xs !mb-1">{lable}</div>}
        // label={lable}
      >
        <InputNumberCommon placeholder={lable} min={0} />
      </Form.Item>
    </>
  );
};

export default IncomeInputPrice;
