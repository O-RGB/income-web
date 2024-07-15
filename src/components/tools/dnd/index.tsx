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

const Draggable: React.FC<DraggableProps> = ({
  incomes,
  renderItem,
  className,
  onMoving,
}) => {
  const [items, setItems] = useState<IIncome[]>(incomes);

  useEffect(() => {
    setItems(incomes);
  }, [incomes]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((x) => +active.id === x.indexOfList);
        const newIndex = items.findIndex((x) => +over.id === x.indexOfList);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

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
