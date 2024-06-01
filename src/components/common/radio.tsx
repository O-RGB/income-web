import { Radio } from "antd";
import React from "react";

interface RadioCommonProps {
  options: { label: string; value: string }[];
}

const RadioCommon: React.FC<RadioCommonProps> = ({ options }) => {
  return (
    <Radio.Group>
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
