import RadioCommon from "@/components/common/radio";
import { Form, RadioChangeEvent } from "antd";
import React from "react";
import "./label.css";
interface IncomePriceTypeProps {
  name: string;
  lable?: string;
  options: { label: string; value: string }[];
  defaultValue: string;
  onChange?: ((e: RadioChangeEvent) => void) | undefined;
  color?: string;
}

const IncomePriceType: React.FC<IncomePriceTypeProps> = ({
  name,
  lable,
  options,
  defaultValue,
  onChange,
  color,
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
      <RadioCommon
        color={"#b5b5b5"}
        onChange={onChange}
        options={options}
      ></RadioCommon>
    </Form.Item>
  );
};

export default IncomePriceType;
