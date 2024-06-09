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
import { Button, Form } from "antd";
import { IoMdRemove } from "react-icons/io";

interface IncomeListProps {
  income: IIncome;
  dayRender?: boolean;
  // actionApi: IActionDayIncomesLists;
  IncomeTypesOptions: RadioOptions[];
  itemIndex: number;
  multipleLoading: boolean;
  deleteOnClient?: (index: number) => void;
  deleteOnServer?: (sheetsIndex: number, listIndex: number) => void;
}

const IncomeElement: React.FC<IncomeListProps> = ({
  income,
  // actionApi,
  IncomeTypesOptions,
  itemIndex,
  multipleLoading = false,
  deleteOnClient,
  deleteOnServer,
}) => {
  const [onDetail, setDetail] = useState<boolean>(false);
  // const [income, setIncome] = useState<IIncome>(income);
  const onClickIncomeHandel = () => {
    setDetail(!onDetail);
  };

  // const setLoading = (load: boolean = true) => {
  //   setIncome({ ...income, fetching: load });
  // };

  useEffect(() => {
    // setIncome(income);
  }, [income]);

  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  useEffect(() => {
    // setIncome(income);

    if (income.delete) {
      setTimeout(() => {
        setDeleteAll(true);
      }, 1000);
    }
  }, [income.delete]);

  if (deleteAll) {
    return <></>;
  }
  // if(income.types === "ของใช้ร่วมกัน")
  return (
    <>
      <div
        className={`w-full overflow-hidden ${
          income.delete ? "py-0" : income.draft ? "py-1" : ""
        } duration-300`}
      >
        {/* {JSON.stringify(multipleDraft)} */}
        <LayoutIncomeItem
          actionTop={
            income.draft === true && (
              <Button
                size="small"
                onClick={() => {
                  // setLoading(false);
                  setTimeout(() => {
                    deleteOnClient?.(itemIndex);
                    // const incomeDeleted = actionApi.setDelete(itemIndex);
                    // if (incomeDeleted) {
                    //   setIncome(incomeDeleted);
                    // } else {
                    //   setLoading(false);
                    // }
                  }, 100);
                }}
                disabled={income.fetching || multipleLoading}
                icon={<IoMdRemove className="text-lg"></IoMdRemove>}
                // type="default"
                // htmlType="button"
                className="!bg-red-500 !text-white "
              ></Button>
            )
          }
          initIncome={income}
        >
          {/* <Form
              form={multipleDraft ? headForm : form}
              layout="vertical"
              onFinish={(input: IncomeFormInput) => {
                if (income.fetching !== true) {
                  // setIncome({ ...income, fetching: true, draft: false });
                  const incomeData = hanndelInputIncome(input);
                  setIncome({ ...incomeData });
                  actionApi.onUpdate("add", incomeData).then((data) => {
                    if (data) {
                      // setIncome(data);
                      console.log("on add data ", data);
                      actionApi.setAdd(itemIndex, data);
                    }
                  });
                }
              }}
            > */}
          <div
            onClick={income.draft == true ? () => {} : onClickIncomeHandel}
            className={`flex cursor-pointer ${
              income._priceType == "Expenses" ? "flex-row" : "flex-row-reverse"
            } justify-between items-center `}
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
                    state={
                      income.fetching || multipleLoading ? "loading" : undefined
                    }
                    _priceType={income._priceType}
                    day={income.day}
                  ></RenderDay>
                )}

                {income.draft === false ? (
                  <RenderName
                    _priceType={income._priceType}
                    name={income.name}
                  ></RenderName>
                ) : (
                  <></>
                )}
              </div>
              <RenderType
                _priceType={income._priceType}
                types={income.types}
              ></RenderType>
            </div>
            <div className={`flex gap-2 justify-center items-center`}>
              {income.draft == false && (
                <RenderPrice
                  _priceType={income._priceType}
                  expensesPrice={income.expensesPrice}
                  revenuePrice={income.revenuePrice}
                ></RenderPrice>
              )}
            </div>
          </div>
          {/* <div className="flex gap-3 divide-y  border font-bold">
              <div
                className={`${
                  income.fetching ? "text-red-500" : "text-green-500"
                }`}
              >
                fetching: {JSON.stringify(income.fetching)}
              </div>
              <div
                className={`${
                  income.draft ? "text-red-500" : "text-green-500"
                }`}
              >
                draft: {JSON.stringify(income.draft)}
              </div>
              <div
                className={`${
                  income.delete ? "text-red-500" : "text-green-500"
                }`}
              >
                delete: {JSON.stringify(income.delete)}
              </div>
              <div>itemIndex: {itemIndex}</div>
              <div
                className={`${onDetail ? "text-red-500" : "text-green-500"}`}
              >
                onDetail: {JSON.stringify(onDetail)}
              </div>
              <div
                className={`${
                  income.sheetsIndex ? "text-red-500" : "text-green-500"
                }`}
              >
                sheetsIndex: {JSON.stringify(income.sheetsIndex)}
              </div>
            </div> */}
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
                <div
                
                  onClick={() => {
                    if (income.fetching !== true) {
                      deleteOnServer?.(income.sheetsIndex, itemIndex);
                      // setLoading();
                      // actionApi
                      //   .onUpdate?.("delete", income)
                      //   .then((data) => {
                      //     if (data) {
                      //       // setDelete(itemIndex);
                      //       actionApi.setDelete(itemIndex);
                      //       // setIncome(data);
                      //     } else {
                      //       setLoading(false);
                      //     }
                      //   })
                      //   .catch(() => {
                      //     setLoading(false);
                      //   });
                    }
                  }}
                  className="w-fit border p-1 cursor-pointer bg-red-500 text-white rounded-lg"
                >
                  delete
                </div>
              </div>
            )}

          {income.draft === true ? (
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-2">
                <div className="w-[80px]">
                  <IncomeInputCountItem
                    name={"count_" + itemIndex}
                    lable="จำนวน"
                  ></IncomeInputCountItem>
                </div>
                <IncomeInputName
                  name={"name_" + itemIndex}
                  lable="ชื่อรายการ"
                ></IncomeInputName>
                <div className="w-[30%]">
                  <IncomeInputPrice
                    name={"price_" + itemIndex}
                    lable="ราคา"
                  ></IncomeInputPrice>
                </div>
              </div>
              <div className="flex gap-2 justify-between">
                <div className="w-[150px]">
                  <IncomeInputTypes
                    options={IncomeTypesOptions}
                    name={"types_" + itemIndex}
                    lable="หมวดหมู่"
                  ></IncomeInputTypes>
                </div>
                <div className="">
                  <IncomePriceType
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
