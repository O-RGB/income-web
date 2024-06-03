import { InputNumber, InputNumberProps } from "antd";
import React from "react";

interface InputNumberCommonProps extends InputNumberProps {}

const InputNumberCommon: React.FC<InputNumberCommonProps> = ({ ...props }) => {
  return <InputNumber size="small" {...props} className="w-full"></InputNumber>;
};

export default InputNumberCommon;
