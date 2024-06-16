import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";

interface LayoutIncomeItemProps {
  initIncome: IIncome;
  children?: React.ReactNode;
  actionTop?: React.ReactNode;
  edit: boolean;
  onClickCheck?: () => void;
}

const LayoutIncomeItem: React.FC<LayoutIncomeItemProps> = ({
  initIncome,
  children,
  actionTop,
  edit,
  onClickCheck,
}) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);
  return (
    <>
      <div
        className={`w-full transition-all relative flex gap-1 items-center  ${
          show ? "" : "translate-x-full"
        } ${
          initIncome.delete
            ? "max-h-0 duration-500 invisible "
            : initIncome.draft
            ? "max-h-[500px] border border-blue-500 rounded-md p-1  duration-1000 "
            : "max-h-[200px] duration-1000"
        } `}
      >
        <div
          className={`${
            edit == true ? "w-10" : "w-0"
          }  duration-300 overflow-hidden  flex items-center justify-center `}
        >
          <Checkbox onClick={onClickCheck} className=""></Checkbox>
        </div>

        <div
          className={`w-full ${edit == true ? "pointer-events-none" : '"'}`}
          onClick={(e) => (edit == true ? e.stopPropagation() : undefined)}
        >
          <div className="absolute top-2 right-2 flex gap-1 z-10">
            {actionTop}
          </div>
          <div
            className={`flex flex-col px-3 py-2 gap-2  ${
              initIncome.fetching
                ? "bg-gray-200"
                : initIncome._priceType == "Expenses"
                ? "bg-red-50/50"
                : "bg-green-50/50"
            }  ${
              initIncome.draft ? "" : "hover:bg-gray-100"
            }  overflow-hidden duration-300 transition-all border border-white rounded-sm w-full `}
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutIncomeItem;
