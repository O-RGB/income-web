import InputNumberCommon from "@/components/common/inputNumber";
import { Form, Input } from "antd";
import React, { useEffect } from "react";

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
      >
        <InputNumberCommon placeholder={lable} min={1} max={100} />
      </Form.Item>
    </>
  );
};

export default IncomeInputCountItem;
