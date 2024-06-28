import { ConfigProvider, Radio, RadioGroupProps } from "antd";
import React, { useEffect } from "react";

interface RadioCommonProps extends RadioGroupProps {
  options: { label: string; value: string }[];
  color?: string;
}

const RadioCommon: React.FC<RadioCommonProps> = ({
  options,
  color,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            colorPrimary: color,
            colorPrimaryHover: color,
          },
        },
      }}
    >
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        size="small"
        {...props}
      >
        {options.map((data, index) => {
          return (
            <Radio key={`radio-data-${index}`} value={data.value}>
              {data.label}
            </Radio>
          );
        })}
      </Radio.Group>
    </ConfigProvider>
  );
};

export default RadioCommon;
