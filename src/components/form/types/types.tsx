import InputCommon from "@/components/common/input";
import { Button, Form, FormInstance, Popconfirm } from "antd";

import React, { useState } from "react";
import IconsSelecter from "./icons-selecter";
import { IconsModel } from "@/utils/models/icons";

interface TypesManagerProps {
  value?: IIncomeTypes;
  indexOfList?: number;
  onSave?: (type: IIncomeTypes) => Promise<boolean>;
  onEdit?: (type: IIncomeTypes) => Promise<boolean>;
  onDelete?: (rowId: number, indexOfList: number) => Promise<boolean>;
  onClose?: (value: boolean) => void;
  isSuccess?: () => Promise<void>;
  form?: FormInstance<any>;
}

const TypesManager: React.FC<TypesManagerProps> = ({
  value,
  onSave,
  onEdit,
  onDelete,
  onClose,
  isSuccess,
  form,
  indexOfList,
}) => {
  const [iconPreview, setPreview] = useState<IconsModel>();
  const [load, setLoad] = useState<boolean>(false);
  const [loadDelete, setLoadDelete] = useState<boolean>(false);
  return (
    <>
      <Form
        form={form}
        onFinish={(input) => {
          console.log(input);
          setLoad(true);
          let maping = {
            color: value ? value.color : "",
            icons: input.icons,
            name: input.name,
            rowIndex: value ? value.rowIndex : 0,
            typeId: value ? value.typeId : "",
          };
          const t = !value ? onSave?.(maping) : onEdit?.(maping);
          t?.then((data) => {
            if (data) {
              setLoad(false);
              isSuccess?.().then(() => {});
            }
            setLoad(false);
            onClose?.(false);
          });
        }}
        layout="vertical"
      >
        <div className="flex flex-col gap-2">
          <div className="border p-2 w-full h-20 rounded flex items-center justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl ">
              {iconPreview?.render}
            </div>
          </div>
          <Form.Item label="ชื่อหมวดหมู่" name={"name"}>
            <InputCommon
              disabled={load || loadDelete}
              size="middle"
            ></InputCommon>
          </Form.Item>
        </div>

        <Form.Item label="ไอคอน" name={"icons"}>
          <IconsSelecter
            disabled={load || loadDelete}
            onSelectIcon={setPreview}
          ></IconsSelecter>
        </Form.Item>

        <div className="flex gap-2 w-full justify-end">
          {value && (
            <>
              <Popconfirm
                onConfirm={() => {
                  setLoadDelete(true);
                  indexOfList
                    ? onDelete?.(value.rowIndex, indexOfList).then((data) => {
                        if (data) {
                          isSuccess?.().then(() => {});
                        }
                        setLoadDelete(false);
                        onClose?.(false);
                      })
                    : undefined;
                  return true;
                }}
                okText="ลบออก"
                cancelText="ปิด"
                title={"ยืนยันการลบ"}
              >
                <Button loading={loadDelete} disabled={load} type="text">
                  ลบ
                </Button>
              </Popconfirm>
              <div className="w-full"></div>
            </>
          )}
          <Button
            disabled={load || loadDelete}
            onClick={() => onClose?.(false)}
            type="default"
          >
            ยกเลิก
          </Button>
          <Button
            disabled={loadDelete}
            loading={load}
            htmlType="submit"
            type="primary"
          >
            {!value ? "สร้าง" : "แก้ไข"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default TypesManager;
