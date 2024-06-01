import { Radio, RadioGroupProps } from "antd";
import React from "react";

interface RadioCommonProps extends RadioGroupProps {
  options: { label: string; value: string }[];
}

const RadioCommon: React.FC<RadioCommonProps> = ({ options, ...props }) => {
  return (
    <Radio.Group {...props}>
      {options.map((data, index) => {
        return (
          <Radio key={`radio-data-${index}`} value={data.value}>
            {data.label}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};

export default RadioCommon;
