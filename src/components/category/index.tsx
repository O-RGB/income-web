import React from "react";
import CateSelect from "./cate-select";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";

interface CategoryProps {
  options: RadioOptions[];
  selectValue?: string;
  onSelectCate?: (cate: RadioOptions) => void;
}

const Category: React.FC<CategoryProps> = ({
  options,
  selectValue,
  onSelectCate,
}) => {
  return (
    <div className="px-2 flex flex-col gap-4">
      <div className="flex justify-between">
        <Button
          disabled
          className="flex items-center justify-center"
          icon={<FaPlus></FaPlus>}
          type="primary"
        >
          สร้างหมวดหมู่
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2 w-full  relative z-50">
        {options.map((data, index) => {
          return (
            <CateSelect
              onSelectCate={onSelectCate}
              selectValue={selectValue}
              index={index}
              {...data}
            ></CateSelect>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
