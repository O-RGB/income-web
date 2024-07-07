import React, { useContext, useEffect, useState } from "react";
import CateSelect from "./cate-select";
import { Button, Form, Modal } from "antd";
import { FaPen, FaPlus } from "react-icons/fa6";
import { CreateType, DeleteType, EditType } from "@/fetcher/POST/types.post";
import { getLocalByKey } from "@/libs/local";
import TypesManager from "../../form/types/types";
import { MasterContext } from "@/contexts/master.context";

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
  const { Get } = useContext(MasterContext);
  const resetFrom = () => {
    setView(undefined);
    setIndexFocus(-1);
    form.resetFields();
  };
  const createNewType = async (type: IIncomeTypes) => {
    const key = getLocalByKey("google_sheets");
    let return_value = false;
    if (key) {
      const cal = await CreateType(key, type);
      if (cal.success) {
        const res = cal.data;
        if (res) {
          let created: IIncomeTypes = {
            color: res.color,
            icons: res.icons,
            name: res.name,
            rowIndex: res.rowIndex,
            typeId: res.typeId,
          };
          setCloneType((value) => [...value, created]);
          return_value = true;
        }
      } else {
        return_value = false;
      }
    } else {
      return_value = false;
    }
    resetFrom();
    return return_value;
  };
  const editType = async (type: IIncomeTypes) => {
    const key = getLocalByKey("google_sheets");
    let return_value = false;
    if (key) {
      const cal = await EditType(key, type);
      const res = cal.data;
      if (cal.success && res) {
        setCloneType((value) => {
          let i = value.findIndex((x) => x.typeId === res.typeId);
          let clone = value;
          if (i !== -1) {
            clone[i].name = res.name;
            clone[i].icons = res.icons;
          }
          return clone;
        });
        return_value = true;
      } else {
        return_value = false;
      }
    } else {
      return_value = false;
    }
    resetFrom();
    return return_value;
  };
  const deleteType = async (index: number, indexOfList: number) => {
    const key = getLocalByKey("google_sheets");
    let return_value = false;
    if (key) {
      const cal = await DeleteType(key, index);
      const res = cal.success;
      if (res) {
        setCloneType((value) => {
          value = value.filter((_, i) => i !== indexOfList);
          return value;
        });
        return_value = true;
      } else {
        return_value = false;
      }
    } else {
      return_value = false;
    }
    resetFrom();
    return return_value;
  };

  const [viewValue, setView] = useState<IIncomeTypes>();
  const [onCreate, setCreate] = useState<boolean>(false);
  const [indexFocus, setIndexFocus] = useState<number>(-1);

  const [form] = Form.useForm();

  const [cloneType, setCloneType] = useState<IIncomeTypes[]>([]);
  useEffect(() => {
    setCloneType(options);
  }, [options]);

  return (
    <div className="px-2 flex flex-col gap-4 ">
      <Modal
        title="สร้างหมวดหมู่"
        destroyOnClose
        open={onCreate}
        maskClosable={false}
        footer={<></>}
      >
        <TypesManager
          indexOfList={indexFocus}
          value={viewValue}
          form={form}
          onDelete={deleteType}
          isSuccess={Get.getTypes}
          onClose={() => {
            setView(undefined);
            setIndexFocus(-1);
            form.resetFields();
            setCreate(false);
          }}
          onSave={createNewType}
          onEdit={editType}
        ></TypesManager>
      </Modal>
      <div className="flex justify-between">
        <Button
          onClick={() => setCreate(true)}
          className="flex items-center justify-center"
          icon={<FaPlus></FaPlus>}
          type="primary"
        >
          สร้างหมวดหมู่
        </Button>
      </div>
      <div className="max-h-[25.5rem] overflow-auto">
        <div className="grid grid-cols-1 gap-2 w-full  relative z-50  ">
          {cloneType.map((data, index) => {
            return (
              <React.Fragment key={`cate-select-${index}`}>
                <CateSelect
                  value={data}
                  onEditCate={(value) => {
                    form.setFieldsValue(value);
                    setCreate(true);
                    setView(value);
                    setIndexFocus(index);
                  }}
                  // editMode={onEdit}
                  onSelectCate={onSelectCate}
                  selectValue={selectValue}
                  index={index}
                ></CateSelect>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
