import React, { useEffect, useState } from "react";
import PanelMove from "./panel-move";

interface PanelFilterProps extends IPanelMoveProps {
  incomesFilter: IIncomeFilter[] | undefined;
}

const PanelFilter: React.FC<PanelFilterProps> = ({
  incomesFilter,
  ...props
}) => {
  const [IncomeFilter, setIncomeFilter] = useState<IIncomeFilter[]>([]);
  useEffect(() => {
    setIncomeFilter([]);
    setTimeout(() => {
      setIncomeFilter(incomesFilter ?? []);
    }, 100);
  }, [incomesFilter]);
  return IncomeFilter.map((data, index) => {
    const keystr = data.key.replace("_", " ");
    return (
      <div key={`incomes-filter-${index}`}>
        <div className=" py-2 flex justify-end items-center gap-2">
          <div
            style={{
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
            className="w-full h-1 rounded-lg bg-white/70"
          ></div>
          <div
            style={{
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
            className=" bg-white/70 rounded-lg p-0.5 px-4 w-fit text-nowrap "
          >
            {keystr}
          </div>
        </div>
        <div>
          <PanelMove
            {...props}
            cardIncome={{ ...props.cardIncome, size: "small" }}
            draggable={{ ...props.draggable, incomes: data.income }}
            removeDraggable={true}
            padding={index !== IncomeFilter.length - 1 ? "pb-0" : undefined}
          ></PanelMove>
        </div>
      </div>
    );
  });
};

export default PanelFilter;
