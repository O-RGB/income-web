import RadioCommon from "@/components/common/radio";
import { Form, Radio } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect } from "react";

interface IncomePriceTypeProps {
  name: string;
  lable: string;
  options: { label: string; value: string }[];
}

const IncomePriceType: React.FC<IncomePriceTypeProps> = ({
  name,
  lable,
  options,
}) => {
  return (
    <Form.Item name={name} className="m-0 w-full"  label={lable}>
      <RadioCommon options={options}></RadioCommon>
    </Form.Item>
  );
};

export default IncomePriceType;
