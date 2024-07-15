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
}
interface UpdateIndex {
  current: number;
  change: number;
}

const Draggable: React.FC<DraggableProps> = ({
  incomes,
  renderItem,
  className,
  onMoving,
}) => {
  const [items, setItems] = useState<IIncome[]>(incomes);
  const [updateIndex, setUpdateIndex] = useState<UpdateIndex[]>([]);

  useEffect(() => {
    setItems(incomes);
  }, [incomes]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const activeIndex = items.findIndex(
          (x) => +active.id === x.indexOfList
        );
        const overIndex = items.findIndex((x) => +over.id === x.indexOfList);

        setItems((items) => arrayMove(items, activeIndex, overIndex));

        setUpdateIndex((prevUpdateIndex) => {
          const currentActive = items[activeIndex].indexOfList;
          const newActive = items[overIndex].indexOfList;

          let updated = false;
          const newUpdateIndex = prevUpdateIndex.map((update) => {
            if (update.current === currentActive) {
              updated = true;
              return { ...update, change: newActive };
            }
            return update;
          });

          if (!updated) {
            newUpdateIndex.push({ current: currentActive, change: newActive });
          }

          return newUpdateIndex;
        });
      }
    },
    [items]
  );

  const memoizedRenderItem = useCallback(
    (income: IIncome, index: number) => {
      return renderItem?.(income, index);
    },
    [renderItem]
  );

  useEffect(() => {}, [onMoving]);

  if (!onMoving) {
    return (
      <div className={className}>
        {items.map((income, index) => memoizedRenderItem(income, index))}
      </div>
    );
  } else {
    return (
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        {/* {JSON.stringify(updateIndex)} */}
        <DroppableContainer id="droppable-1" className={className}>
          {items.map((income, index) => (
            <SortableItem
              key={`key-${income.indexOfList}`}
              id={`${income.indexOfList}`}
              noneMove={memoizedRenderItem(income, index)}
            >
              <div className="touch-none h-full p-2">
                <TfiLineDouble></TfiLineDouble>
              </div>
            </SortableItem>
          ))}
        </DroppableContainer>
      </DndContext>
    );
  }
};

export default Draggable;
