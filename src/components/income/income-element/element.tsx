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
      <div className="w-full overflow-hidden">
        <LayoutIncomeItem initIncome={initIncome}>
          <Form
            layout="vertical"
            onFinish={(input: IncomeFormInput) => {
              if (initIncome.fetching !== true) {
                // setIncome({ ...initIncome, fetching: true, draft: false });
                const incomeData = hanndelInputIncome(input);
                setIncome({ ...incomeData });
                actionApi.onUpdate("add", incomeData).then((data) => {
                  if (data) {
                    setIncome(data);
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
                    // if (initIncome.fetching !== true) {
                    //   setLoading();
                    //   actionApi
                    //     .onUpdate?.("delete", initIncome)
                    //     .then((data) => {
                    //       if (data) {
                    //         // setDelete(itemIndex);
                    //         actionApi.setDelete(itemIndex);

                    //         // setIncome(data);
                    //       } else {
                    //         setLoading(false);
                    //       }
                    //     })
                    //     .catch(() => {
                    //       setLoading(false);
                    //     });
                    // }
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
                <IncomeInputName
                  name="name"
                  lable="ชื่อรายการ"
                ></IncomeInputName>
                <IncomeInputPrice name="price" lable="ราคา"></IncomeInputPrice>
                <IncomeInputTypes
                  options={IncomeTypesOptions}
                  name="types"
                  lable="หมวดหมู่"
                ></IncomeInputTypes>
                <IncomeInputCountItem
                  name="count"
                  lable="จำนวน"
                ></IncomeInputCountItem>
                <IncomePriceType
                  defaultValue={"Expenses"}
                  name="priceType"
                  options={[
                    {
                      label: "รายจ่าย",
                      value: "Expenses",
                    },
                    {
                      label: "รายรับ",
                      value: "Revenue",
                    },
                  ]}
                ></IncomePriceType>
                <div className="flex gap-2 w-full">
                  <Button
                    className="w-full"
                    disabled={initIncome.fetching}
                    type="primary"
                    htmlType="submit"
                  >
                    สร้างรายการ
                  </Button>
                  <Button
                    onClick={() => {
                      setLoading(false);
                      setTimeout(() => {
                        const incomeDeleted = actionApi.setDelete(itemIndex);
                        if (incomeDeleted) {
                          setIncome(incomeDeleted);
                        } else {
                          setLoading(false);
                        }
                      }, 100);
                    }}
                    disabled={initIncome.fetching}
                    type="default"
                    htmlType="submit"
                    className="!bg-red-500 !text-white"
                  >
                    ยกเลิก
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </Form>
        </LayoutIncomeItem>
      </div>
    </>
  );
};

export default IncomeElement;
