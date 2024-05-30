import React, { ReactNode, useEffect, useState } from "react";
import RenderDay from "./render/day";
import RenderName from "./render/name";
import RenderType from "./render/type";
import RenderPrice from "./render/price";
import RenderDetail from "./render/detail";

interface IncomeListProps {
  income: IIncome;
  dayRender?: boolean;
  onUpdate: (
    action: "add" | "update" | "delete",
    element: IIncome
  ) => Promise<boolean>;
}

const IncomeElement: React.FC<IncomeListProps> = ({
  income,
  // action,
  dayRender = true,
  onUpdate,
}) => {
  // const [deleteing, setDeleteing] = useState<boolean>(false);

  const [isDelete, setDelete] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [onDetail, setDetail] = useState<boolean>(false);
  const onClickIncomeHandel = () => {
    setDetail(!onDetail);
  };

  useEffect(() => {
    setTimeout(() => {
      setFetching(false);
    }, 3000);
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);

  // if(income.types === "ของใช้ร่วมกัน")
  return (
    <div className="w-full overflow-hidden">
      <div
        className={` transition-all ${show ? "" : "translate-x-full"} ${
          isDelete ? "max-h-0" : "max-h-[200px]"
        } duration-1000`}
      >
        <div
          className={`flex flex-col px-3 py-2 gap-2  ${
            fetching
              ? "bg-gray-200"
              : income._priceType == "Expenses"
              ? "bg-red-50/50"
              : "bg-green-50/50"
          } ${
            onDetail ? "h-max" : "h-max"
          } overflow-hidden duration-300 transition-all border border-white rounded-sm w-full hover:bg-gray-100`}
        >
          <div
            onClick={onClickIncomeHandel}
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
                <RenderDay
                  loading={fetching}
                  _priceType={income._priceType}
                  day={income.day}
                ></RenderDay>
                <RenderName
                  _priceType={income._priceType}
                  name={income.name}
                ></RenderName>
              </div>
              <RenderType
                _priceType={income._priceType}
                types={income.types}
              ></RenderType>
            </div>
            <div className={`flex gap-2 justify-center items-center`}>
              {/* <div className="text-sm text-gray-400">฿</div> */}
              <RenderPrice
                _priceType={income._priceType}
                expensesPrice={income.expensesPrice}
                revenuePrice={income.revenuePrice}
              ></RenderPrice>

              {/* {action && <div>{action?.(income)}</div>} */}
            </div>
          </div>
          <div
            className={`transition-all ${
              !onDetail ? "max-h-0 duration-500" : "max-h-[100px] duration-500"
            } `}
          >
            <div className="pt-4"></div>
            <div
              onClick={() => {
                setFetching(true);
                onUpdate?.("delete", income)
                  .then((data) => {
                    setFetching(data);
                    if (!data) {
                      setDelete(true);
                    }
                  })
                  .catch((e) => {
                    setFetching(false);
                  });
              }}
              className="w-fit border p-1"
            >
              delete
            </div>
            <div
              onClick={() => {
                setFetching(true);
                onUpdate?.("update", income)
                  .then((data) => {
                    setFetching(data);
                  })
                  .catch((e) => {
                    setFetching(false);
                  });
              }}
              className="w-fit border p-1"
            >
              Edit
            </div>
          </div>
          {/* <RenderDetail
          action={() => {
            setDeleteing(true);
          }}
          open={onDetail}
        ></RenderDetail> */}
        </div>
      </div>
    </div>
  );
};

export default IncomeElement;
