import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useEffect, useState, useCallback } from "react";
import DroppableContainer from "./droppableContainer";
import SortableItem from "./sortableItem";
import { TfiLineDouble } from "react-icons/tfi";

interface DraggableProps {
  incomes: IIncome[];
  renderItem?: (node: IIncome, index: number) => React.ReactNode;
  className?: string;
  onMoving?: boolean;
  onItemMoveing?: (incomeUpdate: IIncome[]) => void;
}

const Draggable: React.FC<DraggableProps> = ({
  incomes,
  renderItem,
  className,
  onMoving,
  onItemMoveing,
}) => {
  const [items, setItems] = useState<IIncome[]>(incomes);

  useEffect(() => {
    setItems(incomes);
  }, [incomes]);

  // การ update เร็วเกินไปจะทำให้ รูปภาพ CateIcons ไม่เปลี่ยนแปลง
  // useEffect(() => {
  //   setItems([]);
  //   setTimeout(() => {
  //     setItems(incomes);
  //   }, 10);
  // }, [onMoving]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const activeIndex = items.findIndex(
          (x) => +active.id === x.indexOfList
        );
        const overIndex = items.findIndex((x) => +over.id === x.indexOfList);
        let getMoveing: IIncome[] = [];
        setItems((items) => {
          getMoveing = arrayMove(items, activeIndex, overIndex);
          return getMoveing;
        });
        onItemMoveing?.([...getMoveing]);
      }
    },
    [items]
  );

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <DroppableContainer id="droppable-1" className={className}>
        {items.map((income, index) => (
          <SortableItem
            disabled={!onMoving}
            key={`key-${income.indexOfList}`}
            id={`${income.indexOfList}`}
            noneMove={renderItem?.(income, index)}
          >
            <div
              className={`touch-none h-full  overflow-hidden ${
                onMoving ? "w-8 p-2" : "w-0 p-0"
              } transition-all duration-300`}
            >
              <TfiLineDouble></TfiLineDouble>
            </div>
          </SortableItem>
        ))}
      </DroppableContainer>
    </DndContext>
  );
};

export default Draggable;
