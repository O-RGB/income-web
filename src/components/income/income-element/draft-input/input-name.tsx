import InputCommon from "@/components/common/input";
import { Form, Input } from "antd";
import React, { useEffect } from "react";

interface IncomeInputNameProps {
  name: string;
  lable: string;
}

const IncomeInputName: React.FC<IncomeInputNameProps> = ({ lable, name }) => {
  return (
    <>
      <Form.Item
        rules={[{ required: true }]}
        name={name}
        className="m-0 w-full"
        // label={lable}
      >
        <InputCommon className={"w-full"} placeholder={lable} />
      </Form.Item>
    </>
  );
};

export default IncomeInputName;
