import React, { useState } from "react";
import CateSelect from "./cate-select";
import { Button } from "antd";
import { FaPen, FaPlus } from "react-icons/fa6";
import { ImDrawer } from "react-icons/im";

interface CategoryProps {
  options: IIncomeTypes[];
  selectValue?: string;
  onSelectCate?: (cate: IIncomeTypes) => void;
}

const Category: React.FC<CategoryProps> = ({
  options,
  selectValue,
  onSelectCate,
}) => {
  const [onEdit, setEdit] = useState<boolean>(false);
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
        <Button
          disabled
          onClick={() => setEdit(!onEdit)}
          className="flex items-center justify-center"
          icon={<FaPen></FaPen>}
          type="primary"
        >
          แก้ไข
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2 w-full  relative z-50">
        {options.map((data, index) => {
          return (
            <React.Fragment key={`cate-select-${index}`}>
              <CateSelect
                value={data}
                editMode={onEdit}
                onSelectCate={onSelectCate}
                selectValue={selectValue}
                index={index}
              ></CateSelect>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
