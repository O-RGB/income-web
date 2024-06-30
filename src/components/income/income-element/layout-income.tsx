import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";

interface LayoutIncomeItemProps {
  initIncome: IIncome;
  children?: React.ReactNode;
  actionTop?: React.ReactNode;
  draftPriceMode?: priceType;
  edit: boolean;
  onClickCheck?: () => void;
  colorTheme: ColorTheme;
}

const LayoutIncomeItem: React.FC<LayoutIncomeItemProps> = ({
  initIncome,
  children,
  actionTop,
  draftPriceMode,
  edit,
  onClickCheck,
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
            ? "max-h-0 duration-500 invisible "
            : initIncome.draft
            ? "max-h-[500px] border border-blue-500 rounded-md p-1  duration-1000 "
            : "max-h-[200px] duration-1000"
        } `}
      >
        <div
          className={`w-full ${edit == true ? "pointer-events-none" : '"'}`}
          onClick={(e) => (edit == true ? e.stopPropagation() : undefined)}
        >
          <div className="absolute top-0 right-0 flex gap-1 z-10">
            {actionTop}
          </div>

          <div
            style={{
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
            className={`flex flex-col px-3 py-2 gap-2  ${
              initIncome.fetching ? "bg-gray-200" : colorTheme.background
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
