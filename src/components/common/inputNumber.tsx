import { InputNumber, InputNumberProps } from "antd";
import React from "react";

interface InputNumberCommonProps extends InputNumberProps {}

const InputNumberCommon: React.FC<InputNumberCommonProps> = ({ ...props }) => {
  return <InputNumber {...props} className="w-full"></InputNumber>;
};

export default InputNumberCommon;
