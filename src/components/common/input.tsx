import { Input, InputProps } from "antd";
import React from "react";

interface InputCommonProps extends InputProps {}

const InputCommon: React.FC<InputCommonProps> = ({}) => {
  return <Input className="w-full z-10"></Input>;
};

export default InputCommon;
