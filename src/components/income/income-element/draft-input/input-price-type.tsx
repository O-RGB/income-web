import RadioCommon from "@/components/common/radio";
import { Form, Radio } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect } from "react";
import "./label.css"
interface IncomePriceTypeProps {
  name: string;
  lable?: string;
  options: { label: string; value: string }[];
  defaultValue: string;
}

const IncomePriceType: React.FC<IncomePriceTypeProps> = ({
  name,
  lable,
  options,
  defaultValue,
}) => {
  return (
    <Form.Item
        rules={[{ required: true }]}
      name={name}
      className="m-0 w-full"
      // label={<div className="text-xs !mb-1">{lable}</div>}
    //   label={lable}
      initialValue={defaultValue}
    >
      <RadioCommon options={options}></RadioCommon>
    </Form.Item>
  );
};

export default IncomePriceType;
