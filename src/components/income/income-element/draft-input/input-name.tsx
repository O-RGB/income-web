import InputCommon from "@/components/common/input";
import { AutoComplete, Divider, Form, Input, Select, SelectProps } from "antd";
import React, { useEffect, useState } from "react";
import "./label.css";
import AutoCompleteCommon from "@/components/common/autocomplete";
import SelectCommon from "@/components/common/select";
const { Option } = Select;
interface IncomeInputNameProps {
  name: string;
  lable: string;
  option?: SelectProps["options"];
}

const IncomeInputName: React.FC<IncomeInputNameProps> = ({
  lable,
  name,
  option,
}) => {
  const [onSearch, setSearch] = useState<string>("");
  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => {
    const data = (option?.label ?? "")
      .toLowerCase()
      .includes(input.toLowerCase());

    if (onSearch.length > 0) {
      return data;
    }
  };

  return (
    <>
      <Form.Item
        rules={[{ required: true }]}
        name={name}
        className="m-0 w-full"
        label={<div className="text-xs !mb-1">{lable}</div>}
        // label={lable}
      >
        <AutoCompleteCommon
          className={"w-full"}
          placeholder={lable}
          showSearch
          onSearch={setSearch}
          optionFilterProp="children"
          options={onSearch.length > 0 ? option : []}
          notFoundContent={null}
          optionRender={(option) => {
            return (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                <div>{option.label}</div>
              </div>
            );
          }}
          filterOption={filterOption as any}
        ></AutoCompleteCommon>
      </Form.Item>
    </>
  );
};

export default IncomeInputName;
