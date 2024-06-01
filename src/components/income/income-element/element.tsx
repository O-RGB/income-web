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

// let newElement: IIncome = {
//   sheetsIndex: findIndexNotDelete() + 2,
//   _priceType: "Expenses",
//   day: dayIndex,
//   expensesCount: 0,
//   expensesPrice: 0,
//   name: "",
//   revenueCount: 0,
//   revenuePrice: 0,
//   types: "",
//   delete: false,
//   fetching: false,
//   draft: true,
// };

interface IncomeListProps {
  indexOfDay: number;
  income: IIncome;
  dayRender?: boolean;
  // fetch: boolean;
  setDelete: (indexOfDay: number) => IIncome | undefined;
  onUpdate: (
    action: "add" | "update" | "delete",
    element: IIncome
  ) => Promise<IIncome | undefined>;
  IncomeTypesOptions: RadioOptions[];
}

const IncomeElement: React.FC<IncomeListProps> = ({
  income,
  // fetch = false,
  dayRender = true,
  setDelete,
  onUpdate,
  indexOfDay,
  IncomeTypesOptions,
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
        types = nameType.label ?? "";
      } else {
        types = "";
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

  useEffect(() => {
    setIncome(income);
  }, [income]);

  // if(income.types === "ของใช้ร่วมกัน")
  return (
    <div className="w-full overflow-hidden">
      <LayoutIncomeItem initIncome={initIncome}>
        <Form
          layout="vertical"
          onFinish={(input: IncomeFormInput) => {
            if (initIncome.fetching !== true) {
              setIncome({ ...initIncome, fetching: true });
              const incomeData = hanndelInputIncome(input);
              onUpdate("add", incomeData);
            }
          }}
        >
          <div
            onClick={initIncome.draft ? () => {} : onClickIncomeHandel}
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
                    initIncome.draft
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
          {initIncome.draft == false && (
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
                    setIncome({ ...initIncome, fetching: true });
                    onUpdate?.("delete", initIncome).then((data) => {
                      if (data) {
                        setDelete(indexOfDay);
                      }
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
                    onUpdate?.("update", initIncome).then((data) => {
                      if (data) {
                        setIncome(data);
                      }
                    });
                  }
                }}
                className="w-fit border p-1"
              >
                Edit
              </div>
            </div>
          )}

          {initIncome.draft ? (
            <div className="flex flex-col gap-2 pt-2">
              <IncomeInputName name="name" lable="ชื่อรายการ"></IncomeInputName>
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
              <Button
                disabled={initIncome.fetching}
                type="primary"
                htmlType="submit"
              >
                สร้างรายการ
              </Button>
            </div>
          ) : (
            <></>
          )}
        </Form>
      </LayoutIncomeItem>
    </div>
  );
};

export default IncomeElement;
