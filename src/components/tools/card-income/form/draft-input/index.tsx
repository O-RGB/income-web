import { Form, Button } from "antd";
import React, { useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import IncomeComment from "./input-comment";
import IncomeInputCountItem from "./input-count-item";
import IncomeInputName from "./input-name";
import IncomeInputPrice from "./input-price";
import IncomePriceType from "./input-price-type";
import IncomeInputTypes from "./input-types";

interface DraftInputProps {
  income: IIncome;
  index: number;
  master: IMasterDataImcomes;
  onRemoveNote?: (income: IIncome, index: number) => void;
  onPriceTypeChange?: (type: priceType) => void;
  onOpenCategory?: () => void;
  categorySelected?: string;
}

const DraftInput: React.FC<DraftInputProps> = ({
  income,
  index,
  master,
  onRemoveNote,
  onPriceTypeChange,
  onOpenCategory,
  categorySelected,
}) => {
  const [noteOpen, setNote] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex gap-2">
          <div className="w-[46px]">
            <IncomeInputCountItem
              name={"count_" + index}
              lable="จำนวน"
            ></IncomeInputCountItem>
          </div>
          <IncomeInputName
            name={"name_" + index}
            lable="ชื่อรายการ"
            option={master.dupOfMonth}
          ></IncomeInputName>
          <div className="w-[30%]">
            <IncomeInputPrice
              name={"price_" + index}
              lable="ราคา"
            ></IncomeInputPrice>
          </div>
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-1">
            <div className="w-fit" onClick={() => {}}>
              <div className="flex gap-3 items-center ">
                <div className="text-nowrap text-xs !mb-1">{"หมวดหมู่"}</div>
                <Form.Item
                  rules={[{ required: true }]}
                  name={"types_" + index}
                  className="m-0 w-full remove-lable"
                  initialValue={"T00"}
                >
                  <IncomeInputTypes
                    category={categorySelected}
                    onClick={onOpenCategory}
                    options={master.typesOfItems}
                  ></IncomeInputTypes>
                </Form.Item>
              </div>
            </div>
            <div className="pt-1">
              <Button
                type={noteOpen ? "primary" : "default"}
                onClick={() => {
                  setNote(!noteOpen);
                  if (!noteOpen === false) {
                    onRemoveNote?.(income, index);
                  }
                }}
                size="small"
                icon={<MdOutlineEditNote></MdOutlineEditNote>}
              ></Button>
            </div>
          </div>
          <div className="">
            <IncomePriceType
              onChange={(e) => {
                const value = e.target.value;
                onPriceTypeChange?.(value);
              }}
              defaultValue={"Expenses"}
              name={"priceType_" + index}
              options={[
                {
                  label: "จ่าย",
                  value: "Expenses",
                },
                {
                  label: "รับ",
                  value: "Revenue",
                },
              ]}
            ></IncomePriceType>
          </div>
        </div>
        <div
          className={`flex gap-2 overflow-hidden ${
            !noteOpen ? "max-h-0" : "max-h-10"
          } transition-all duration-300`}
        >
          <IncomeComment
            name={"comment_" + index}
            lable={"คอมเม้นต์"}
          ></IncomeComment>
        </div>
      </div>
    </>
  );
};

export default DraftInput;
