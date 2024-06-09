import { Select, SelectProps } from "antd";
import React from "react";

interface SelectCommonProps extends SelectProps {}

const SelectCommon: React.FC<SelectCommonProps> = ({ ...props }) => {
  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      {...props}
      size="small"
      showSearch
      optionFilterProp="children"
      filterOption={filterOption as any}
      className="w-full text-xs"
    ></Select>
  );
};

export default SelectCommon;
