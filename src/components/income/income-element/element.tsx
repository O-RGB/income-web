import React, { ReactNode, useEffect, useState } from "react";
import RenderDay from "./render/day";
import RenderName from "./render/name";
import RenderType from "./render/type";
import RenderPrice from "./render/price";
import IncomeInputName from "./draft-input/input-name";
import IncomeInputPrice from "./draft-input/input-price";
import IncomePriceType from "./draft-input/input-price-type";
import IncomeInputTypes from "./draft-input/input-types";
import IncomeInputCountItem from "./draft-input/input-count-item";
import LayoutIncomeItem from "./layout-income";
import { Button, Checkbox, Form, Popconfirm } from "antd";
import { IoMdRemove } from "react-icons/io";
import IncomeComment from "./draft-input/input-comment";
import ButtomSheets from "@/components/common/buttomSheets";
import { MdFollowTheSigns, MdOutlineEditNote } from "react-icons/md";
import { RiDeleteBin5Line, RiGpsFill } from "react-icons/ri";

interface IncomeListProps {
  income: IIncome;
  dayRender?: boolean;
  master: IMasterDataImcomes;
  itemIndex: number;
  multipleLoading: boolean;
  deleteOnClient?: (index: number) => void;
  deleteOnServer?: (sheetsIndex: number, listIndex: number) => void;
  removeCommnet?: (income: IIncome, index: number) => void;
  edit: boolean;
  onSelectEdit?: (index: number) => void;
}

const IncomeElement: React.FC<IncomeListProps> = ({
  income,
  edit = false,
  master,
  removeCommnet,
  itemIndex,
  multipleLoading = false,
  deleteOnClient,
  deleteOnServer,
  onSelectEdit,
}) => {
  const [comment, setCommnet] = useState<boolean>(false);
  const [priceMode, setPriceMode] = useState<"Expenses" | "Revenue">(
    "Expenses"
  );
  const [onDetail, setDetail] = useState<boolean>(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme>(
    income._priceType === "Expenses"
      ? {
          priceType: "Expenses",
          background: "bg-white/70",
          color: "#ff5c5c",
          text: "text-gray-700",
        }
      : {
          priceType: "Revenue",
          background: "bg-white/70",
          color: "#3dc940",
          text: "text-gray-700",
        }
  );

  const onClickIncomeHandel = () => {
    setDetail(!onDetail);
  };

  useEffect(() => {}, [income, edit]);

  const debug = (
    <>
      <div className="flex gap-3 divide-y  border font-bold">
        <div
          className={`${income.fetching ? "text-red-500" : "text-green-500"}`}
        >
          fetching: {JSON.stringify(income.fetching)}
        </div>
        <div className={`${income.draft ? "text-red-500" : "text-green-500"}`}>
          draft: {JSON.stringify(income.draft)}
        </div>
        <div className={`${income.delete ? "text-red-500" : "text-green-500"}`}>
          delete: {JSON.stringify(income.delete)}
        </div>
        <div>itemIndex: {itemIndex}</div>
        <div className={`${onDetail ? "text-red-500" : "text-green-500"}`}>
          onDetail: {JSON.stringify(onDetail)}
        </div>
        <div
          className={`${
            income.sheetsIndex ? "text-red-500" : "text-green-500"
          }`}
        >
          sheetsIndex: {JSON.stringify(income.sheetsIndex)}
        </div>
      </div>
    </>
  );

  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  useEffect(() => {
    if (income.delete) {
      setTimeout(() => {
        setDeleteAll(true);
      }, 1000);
    }
  }, [income.delete]);

  if (deleteAll) {
    return <> </>;
  }
  return (
    <>
      {/* {debug} */}
      <div
        className={`w-full overflow-hidden flex items-center gap-1    ${
          income.delete ? "py-0 pb-0" : income.draft ? "py-1" : "pb-1"
        } duration-300`}
      >
        <LayoutIncomeItem
          colorTheme={colorTheme}
          draftPriceMode={priceMode}
          edit={edit}
          onClickCheck={() => {
            onSelectEdit?.(itemIndex);
          }}
          actionTop={
            income.draft === true && (
              <Button
                size="small"
                onClick={() => {
                  setTimeout(() => {
                    deleteOnClient?.(itemIndex);
                  }, 100);
                }}
                disabled={income.fetching || multipleLoading}
                icon={<IoMdRemove className="text-lg"></IoMdRemove>}
                className="!bg-red-500 !text-white scale-75"
              ></Button>
            )
          }
          initIncome={income}
        >
          <div
            onClick={income.draft == true ? () => {} : onClickIncomeHandel}
            className={`flex cursor-pointer ${
              income._priceType == "Expenses" ? "flex-row" : "flex-row-reverse"
            } justify-between items-start `}
          >
            <div className="w-full">
              <div
                className={`flex ${
                  income._priceType == "Expenses"
                    ? "flex-row"
                    : "flex-row-reverse"
                } gap-3 items-center w-full`}
              >
                {income.draft === false && (
                  <RenderDay
                    typesOfItems={master.typesOfItems}
                    types={income.types}
                    colorTheme={colorTheme}
                    state={
                      income.fetching || multipleLoading ? "loading" : undefined
                    }
                    _priceType={income._priceType}
                    day={income.day}
                  ></RenderDay>
                )}

                {income.draft === false ? (
                  <RenderName
                    colorTheme={colorTheme}
                    _priceType={income._priceType}
                    name={income.name}
                  ></RenderName>
                ) : (
                  <></>
                )}
              </div>
              {/* <div className="flex gap-2"> */}
              <div>
                <RenderType
                  typesOfItems={master.typesOfItems}
                  comment={
                    <div className="line-clamp-1 opacity-50">
                      {income.comment}
                    </div>
                  }
                  _priceType={income._priceType}
                  types={income.types}
                ></RenderType>
              </div>

              {/* </div> */}
            </div>
            <div className={`flex gap-2 items-start `}>
              {income.draft == false && (
                <RenderPrice
                  colorTheme={colorTheme}
                  _priceType={income._priceType}
                  expensesPrice={income.expensesPrice}
                  revenuePrice={income.revenuePrice}
                ></RenderPrice>
              )}
            </div>
          </div>

          {/* sheetsIndex: {JSON.stringify(income.sheetsIndex)} */}
          {income.draft == false &&
            income.fetching == false &&
            multipleLoading === false && (
              <div
                className={`transition-all ${
                  !onDetail
                    ? "max-h-0 duration-500"
                    : "max-h-[100px] duration-500"
                } `}
              >
                <div className="pt-4"></div>
                <div className="flex gap-2 justify-between">
                  <Button type="text" size="small">
                    <div className="flex items-center justify-center gap-1">
                      <RiGpsFill className="text-xs" />
                      <div>ติดตามสิ่งนี้</div>
                    </div>
                  </Button>
                  <Popconfirm
                  style={{right:10}}
                    className="!bg-white/70"
                    title="ลบรายการนี้"
                    description="ยืนยันการลบรายการแล้วใช่ไหม?"
                    onConfirm={() => {
                      if (income.fetching !== true) {
                        deleteOnServer?.(income.sheetsIndex, itemIndex);
                      }
                    }}
                    okText="ลบออก"
                    cancelText="ยกเลิก"
                  >
                    <Button type="text" size="small">
                      <div className="flex items-center justify-center gap-1">
                        <RiDeleteBin5Line className="text-xs" />
                        {/* <div>ลบรายการ</div> */}
                      </div>
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            )}
          {income.draft === true ? (
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-2">
                <div className="w-[46px]">
                  <IncomeInputCountItem
                    name={"count_" + itemIndex}
                    lable="จำนวน"
                  ></IncomeInputCountItem>
                </div>
                <IncomeInputName
                  name={"name_" + itemIndex}
                  lable="ชื่อรายการ"
                  option={master.dupOfMonth}
                ></IncomeInputName>
                <div className="w-[30%]">
                  <IncomeInputPrice
                    name={"price_" + itemIndex}
                    lable="ราคา"
                  ></IncomeInputPrice>
                </div>
              </div>
              <div className="flex gap-2 justify-between">
                <div className="flex gap-1">
                  <div className="w-fit" onClick={() => {}}>
                    <div className="flex gap-3 items-center ">
                      <div className="text-nowrap text-xs !mb-1">
                        {"หมวดหมู่"}
                      </div>
                      <Form.Item
                        rules={[{ required: true }]}
                        name={"types_" + itemIndex}
                        className="m-0 w-full remove-lable"
                        // label={<div className="text-xs !mb-1">{lable}</div>}
                        initialValue={"T00"}
                      >
                        <IncomeInputTypes
                          options={master.typesOfItems}
                          // name={"types_" + itemIndex}
                          // lable="หมวดหมู่"
                        ></IncomeInputTypes>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="pt-1">
                    <Button
                      type={comment ? "primary" : "default"}
                      onClick={() => {
                        setCommnet(!comment);
                        if (!comment === false) {
                          removeCommnet?.(income, itemIndex);
                        }
                      }}
                      size="small"
                      icon={<MdOutlineEditNote></MdOutlineEditNote>}
                    ></Button>
                  </div>
                </div>
                <div className="">
                  <IncomePriceType
                    color={`${
                      priceMode === "Expenses" ? "#3b81f6" : "#21c55d"
                    }`}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPriceMode(value);
                    }}
                    defaultValue={"Expenses"}
                    name={"priceType_" + itemIndex}
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
                  !comment ? "max-h-0" : "max-h-10"
                } transition-all duration-300`}
              >
                <IncomeComment
                  name={"comment_" + itemIndex}
                  lable={"คอมเม้นต์"}
                ></IncomeComment>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* </Form> */}
        </LayoutIncomeItem>
      </div>
    </>
  );
};

export default IncomeElement;
