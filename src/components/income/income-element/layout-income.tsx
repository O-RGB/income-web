import React, { useEffect, useState } from "react";

interface LayoutIncomeItemProps {
  initIncome: IIncome;
  children?: React.ReactNode;
}

const LayoutIncomeItem: React.FC<LayoutIncomeItemProps> = ({
  initIncome,
  children,
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
        className={`transition-all ${show ? "" : "translate-x-full"} ${
          initIncome.delete
            ? "max-h-0"
            : initIncome.draft
            ? "max-h-[500px]"
            : "max-h-[200px]"
        } duration-1000`}
      >
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
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutIncomeItem;
