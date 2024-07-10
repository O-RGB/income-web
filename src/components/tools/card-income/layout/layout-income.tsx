import React, { useEffect, useState } from "react";

interface LayoutIncomeItemProps {
  initIncome: IIncome;
  children?: React.ReactNode;
  actionTop?: React.ReactNode;
  colorTheme: ColorTheme;
}

const LayoutIncomeItem: React.FC<LayoutIncomeItemProps> = ({
  initIncome,
  children,
  actionTop,
  colorTheme,
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
            ? "max-h-0 duration-300 invisible "
            : initIncome.draft
            ? "max-h-[500px] border border-blue-500 rounded-md p-1  duration-700 "
            : "max-h-[200px] duration-1000"
        } `}
      >
        <div className={`w-full`}>
          <div className="absolute top-0 right-0 flex gap-1 z-10">
            {actionTop}
          </div>

          <div
            style={{
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
            className={`flex flex-col px-3 py-2 gap-2  ${
              initIncome.fetching
                ? "bg-gray-200"
                : colorTheme.background + " " + colorTheme.className
            }  ${
              initIncome.draft ? "" : ``
            }    duration-300 transition-all rounded-lg w-full `}
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutIncomeItem;
