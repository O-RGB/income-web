import { AutoComplete, AutoCompleteProps } from "antd";
import React from "react";

interface AutoCompleteCommonProps extends AutoCompleteProps {}

const AutoCompleteCommon: React.FC<AutoCompleteCommonProps> = ({
  ...props
}) => {
  return <AutoComplete size="small" {...props} className="w-full"></AutoComplete>;
};

export default AutoCompleteCommon;
