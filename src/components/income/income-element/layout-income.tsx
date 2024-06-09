import React, { useEffect, useState } from "react";

interface LayoutIncomeItemProps {
  initIncome: IIncome;
  children?: React.ReactNode;
  actionTop?: React.ReactNode;
}

const LayoutIncomeItem: React.FC<LayoutIncomeItemProps> = ({
  initIncome,
  children,
  actionTop,
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
        className={`transition-all relative ${show ? "" : "translate-x-full"} ${
          initIncome.delete
            ? "max-h-0 duration-500 invisible "
            : initIncome.draft
            ? "max-h-[500px] border border-blue-500 rounded-md p-1  duration-1000"
            : "max-h-[200px] duration-1000"
        } `}
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
    </>
  );
};

export default LayoutIncomeItem;
