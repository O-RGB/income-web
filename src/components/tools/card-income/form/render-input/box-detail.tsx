import { Button, Popconfirm } from "antd";
import React from "react";
import { RiGpsFill, RiEdit2Line, RiDeleteBin5Line } from "react-icons/ri";

interface RenderDetailProps extends Partial<ICardDetailOptions> {
  index: number;
  income: IIncome;
  open?: boolean;
}

const RenderDetail: React.FC<RenderDetailProps> = ({
  open,
  onClickDelete,
  onClickEdit,
  income,
  index,
}) => {
  return (
    <>
      <div
        className={`transition-all ${
          !open ? "max-h-0 duration-500" : "max-h-[100px] duration-500"
        } `}
      >
        <div className="pt-4"></div>
        <div className="flex gap-2 justify-between">
          <Button disabled type="text" size="small">
            <div className="flex items-center justify-center gap-1">
              <RiGpsFill className="text-xs" />
              <div>ติดตามสิ่งนี้</div>
            </div>
          </Button>
          <div className="flex gap-1">
            <Button
              onClick={() => {
                onClickEdit?.(
                  {
                    listIndex: index,
                    sheetsIndex: income.sheetsIndex,
                  },
                  income
                );
              }}
              // disabled
              type="text"
              size="small"
            >
              <div className="flex items-center justify-center gap-1">
                <RiEdit2Line className="text-xs" />
              </div>
            </Button>
            <Popconfirm
              title="ลบรายการนี้"
              description="ยืนยันการลบรายการแล้วใช่ไหม?"
              onConfirm={() => {
                onClickDelete?.(
                  {
                    listIndex: index,
                    sheetsIndex: income.sheetsIndex,
                  },
                  "SERVER"
                );
              }}
              okText="ลบออก"
              cancelText="ยกเลิก"
            >
              <Button type="text" size="small">
                <div className="flex items-center justify-center gap-1">
                  <RiDeleteBin5Line className="text-xs" />
                </div>
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenderDetail;
