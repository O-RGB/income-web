import IncomeElement from "@/components/tools/card-income";
import Draggable from "@/components/tools/dnd";
import React from "react";

interface PanelMoveProps extends IPanelMoveProps {
  padding?: string;
}

const PanelMove: React.FC<PanelMoveProps> = ({
  cardIncome,
  draggable,
  removeDraggable = true,
  padding = "pb-32",
  ...props
}) => {
  const lockAction = props.loading.waitActioning
    ? props.loading.waitActioning
    : false;

  const getDisable = (itemIndex: number) => {
    return props.indexEditing?.length > 0
      ? !props.indexEditing.includes(itemIndex)
      : undefined;
  };

  if (removeDraggable) {
    return (
      <Draggable
        {...draggable}
        className={`flex flex-col-reverse ${padding}`}
        renderItem={(node, itemIndex) => {
          const disabled = getDisable(itemIndex);
          return (
            <div key={`incom-${props.dateSelect.getDate()}-${itemIndex}`}>
              <IncomeElement
                {...cardIncome}
                disabled={disabled}
                lockAction={lockAction}
                itemIndex={itemIndex}
                income={node}
              ></IncomeElement>
            </div>
          );
        }}
      ></Draggable>
    );
  } else {
    return draggable.incomes.map((data, itemIndex) => {
      const disabled = getDisable(itemIndex);
      return (
        <div key={`incom-${props.dateSelect.getDate()}-${itemIndex}`}>
          <IncomeElement
            {...cardIncome}
            disabled={disabled}
            lockAction={lockAction}
            itemIndex={itemIndex}
            income={data}
          ></IncomeElement>
        </div>
      );
    });
  }
};

export default PanelMove;
