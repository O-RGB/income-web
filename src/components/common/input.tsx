import { Input, InputProps } from "antd";
import React from "react";

interface InputCommonProps extends InputProps {}

const InputCommon: React.FC<InputCommonProps> = ({ ...props }) => {
  return <Input size="small" {...props} className="w-full z-10"></Input>;
};

export default InputCommon;
