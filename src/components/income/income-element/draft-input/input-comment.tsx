import InputCommon from "@/components/common/input";
import { Form } from "antd";
import React from "react";
import "./label.css";

interface IncomeInputProps {
  name: string;
  lable: string;
}

const IncomeComment: React.FC<IncomeInputProps> = ({ lable, name }) => {
  return (
    <>
      <Form.Item
        name={name}
        className="m-0 w-full"
        label={<div className="text-xs !mb-1">{lable}</div>}
      >
        <InputCommon></InputCommon>
      </Form.Item>
    </>
  );
};

export default IncomeComment;
