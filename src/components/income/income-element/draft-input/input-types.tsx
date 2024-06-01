import InputCommon from "@/components/common/input";
import { Form, Input } from "antd";
import React, { useEffect } from "react";

interface IncomeInputTypesProps {
  name: string;
  lable: string;
}

const IncomeInputTypes: React.FC<IncomeInputTypesProps> = ({ name, lable }) => {
  return (
    <>
      <Form.Item name={name} className="m-0 w-full" label={lable}>
        <InputCommon placeholder={lable} />
      </Form.Item>
    </>
  );
};

export default IncomeInputTypes;
