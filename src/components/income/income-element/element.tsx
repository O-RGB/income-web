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
import { FaPlus } from "react-icons/fa6";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { IoMdRemove } from "react-icons/io";

interface IncomeFormInput {
  name: string;
  price: string;
  types: string;
  count: string;
  priceType: priceType;
}

interface IncomeListProps {
  // indexOfDay: number;
  income: IIncome;
  dayRender?: boolean;
  actionApi: IActionDayIncomesLists;
  IncomeTypesOptions: RadioOptions[];
  itemIndex: number;
}

const IncomeElement: React.FC<IncomeListProps> = ({
  income,
  // dayRender = true,
  actionApi,
  // indexOfDay,
  IncomeTypesOptions,
  itemIndex,
}) => {
  const [onDetail, setDetail] = useState<boolean>(false);
  const [initIncome, setIncome] = useState<IIncome>(income);
  const [form] = Form.useForm();
  const onClickIncomeHandel = () => {
    setDetail(!onDetail);
  };

  const hanndelInputIncome = (input: IncomeFormInput) => {
    const expenses = {
      expensesCount: 0,
      expensesPrice: 0,
    };

    const revenue = {
      revenueCount: 0,
      revenuePrice: 0,
    };

    if (input.priceType == "Expenses") {
      expenses.expensesCount = Number(input.count);
      expenses.expensesPrice = Number(input.price);
    } else {
      revenue.revenueCount = Number(input.count);
      revenue.revenuePrice = Number(input.price);
    }

    var types: string = "";
    const nameType: RadioOptions | undefined = IncomeTypesOptions.find(
      (x) => x.value === input.types
    );

    if (nameType) {
      if (nameType.value == "T00") {
        types = "";
      } else {
        types = nameType.label ?? "";
      }
    }

    const incomeData: IIncome = {
      day: income.day,
      delete: false,
      draft: false,
      name: input.name,
      fetching: true,
      sheetsIndex: income.sheetsIndex,
      ...expenses,
      ...revenue,
      types: types,
      _priceType: input.priceType,
    };

    return incomeData;
  };

  const setLoading = (load: boolean = true) => {
    setIncome({ ...initIncome, fetching: load });
  };

  useEffect(() => {
    setIncome(income);
  }, [income]);

  // if(income.types === "ของใช้ร่วมกัน")
  return (
    <>
      {/* {JSON.stringify(initIncome)} */}
      <div className="relative">
        {initIncome.draft === true && (
          <div className="absolute -top-2 right-2 flex gap-1">
            <Button
              size="small"
              onClick={() => {
                form.submit();
              }}
              className=" !bg-blue-500 !text-white  "
              disabled={initIncome.fetching}
              // type="primary"
              icon={<FaPlus></FaPlus>}
              // htmlType="submit"
            ></Button>
            <Button
              size="small"
              onClick={() => {
                setLoading(false);
                setTimeout(() => {
                  const incomeDeleted = actionApi.setDelete(itemIndex);
                  // if (incomeDeleted) {
                  //   setIncome(incomeDeleted);
                  // } else {
                  //   setLoading(false);
                  // }
                }, 100);
              }}
              disabled={initIncome.fetching}
              icon={<IoMdRemove className="text-lg"></IoMdRemove>}
              // type="default"
              // htmlType="button"
              className="!bg-red-500 !text-white "
            ></Button>
          </div>
        )}
        <div className="w-full overflow-hidden">
          <LayoutIncomeItem initIncome={initIncome}>
            <Form
              form={form}
              layout="vertical"
              onFinish={(input: IncomeFormInput) => {
                if (initIncome.fetching !== true) {
                  // setIncome({ ...initIncome, fetching: true, draft: false });
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
            >
              <div
                onClick={
                  initIncome.draft == true ? () => {} : onClickIncomeHandel
                }
                className={`flex cursor-pointer ${
                  initIncome._priceType == "Expenses"
                    ? "flex-row"
                    : "flex-row-reverse"
                } justify-between items-center `}
              >
                <div className="w-full">
                  <div
                    className={`flex ${
                      initIncome._priceType == "Expenses"
                        ? "flex-row"
                        : "flex-row-reverse"
                    } gap-3 items-center w-full`}
                  >
                    <RenderDay
                      state={
                        initIncome.draft == true
                          ? "draft"
                          : initIncome.fetching
                          ? "loading"
                          : undefined
                      }
                      _priceType={initIncome._priceType}
                      day={initIncome.day}
                    ></RenderDay>

                    {initIncome.draft === false ? (
                      <RenderName
                        _priceType={initIncome._priceType}
                        name={initIncome.name}
                      ></RenderName>
                    ) : (
                      <>สร้างรายการใหม่</>
                    )}
                  </div>
                  <RenderType
                    _priceType={initIncome._priceType}
                    types={initIncome.types}
                  ></RenderType>
                </div>
                <div className={`flex gap-2 justify-center items-center`}>
                  {initIncome.draft == false && (
                    <RenderPrice
                      _priceType={initIncome._priceType}
                      expensesPrice={initIncome.expensesPrice}
                      revenuePrice={initIncome.revenuePrice}
                    ></RenderPrice>
                  )}
                </div>
              </div>
              {/* <div className="flex gap-3 divide-y  border font-bold">
              <div
                className={`${
                  initIncome.fetching ? "text-red-500" : "text-green-500"
                }`}
              >
                fetching: {JSON.stringify(initIncome.fetching)}
              </div>
              <div
                className={`${
                  initIncome.draft ? "text-red-500" : "text-green-500"
                }`}
              >
                draft: {JSON.stringify(initIncome.draft)}
              </div>
              <div
                className={`${
                  initIncome.delete ? "text-red-500" : "text-green-500"
                }`}
              >
                delete: {JSON.stringify(initIncome.delete)}
              </div>
              <div>itemIndex: {itemIndex}</div>
              <div
                className={`${onDetail ? "text-red-500" : "text-green-500"}`}
              >
                onDetail: {JSON.stringify(onDetail)}
              </div>
              <div
                className={`${
                  initIncome.sheetsIndex ? "text-red-500" : "text-green-500"
                }`}
              >
                sheetsIndex: {JSON.stringify(initIncome.sheetsIndex)}
              </div>
            </div> */}
              {initIncome.draft == false && initIncome.fetching == false && (
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
                      if (initIncome.fetching !== true) {
                        setLoading();
                        actionApi
                          .onUpdate?.("delete", initIncome)
                          .then((data) => {
                            if (data) {
                              // setDelete(itemIndex);
                              actionApi.setDelete(itemIndex);

                              // setIncome(data);
                            } else {
                              setLoading(false);
                            }
                          })
                          .catch(() => {
                            setLoading(false);
                          });
                      }
                    }}
                    className="w-fit border p-1"
                  >
                    delete
                  </div>
                  <div
                    onClick={() => {
                      if (initIncome.fetching !== true) {
                        setIncome({ ...initIncome, fetching: true });
                        actionApi
                          .onUpdate?.("update", initIncome)
                          .then((data) => {
                            if (data) {
                              setIncome(data);
                            } else {
                              setLoading(false);
                            }
                          })
                          .catch(() => {
                            setLoading(false);
                          });
                      }
                    }}
                    className="w-fit border p-1"
                  >
                    Edit
                  </div>
                </div>
              )}

              {initIncome.draft === true ? (
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex gap-2">
                    <div className="w-[80px]">
                      <IncomeInputCountItem
                        name="count"
                        lable="จำนวน"
                      ></IncomeInputCountItem>
                    </div>
                    <IncomeInputName
                      name="name"
                      lable="ชื่อรายการ"
                    ></IncomeInputName>
                    <div className="w-[30%]">
                      <IncomeInputPrice
                        name="price"
                        lable="ราคา"
                      ></IncomeInputPrice>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-[150px]">
                      <IncomeInputTypes
                        options={IncomeTypesOptions}
                        name="types"
                        lable="หมวดหมู่"
                      ></IncomeInputTypes>
                    </div>
                    <div className="  w-full">
                      <IncomePriceType
                        defaultValue={"Expenses"}
                        name="priceType"
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
            </Form>
          </LayoutIncomeItem>
        </div>
      </div>
    </>
  );
};

export default IncomeElement;
