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
  onItemMoveing?: (sheetsIndex: number[]) => void;
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
  onItemMoveing,
}) => {
  const [items, setItems] = useState<IIncome[]>(incomes);
  const [itemsUpdate, setItemsUpdate] = useState<IIncome[]>([]);
  const [updateIndex, setUpdateIndex] = useState<UpdateIndex[]>([]);

  useEffect(() => {
    setItems(incomes);
  }, [incomes]);

  // การ update เร็วเกินไปจะทำให้ รูปภาพ CateIcons ไม่เปลี่ยนแปลง
  useEffect(() => {
    setItems([]);
    setTimeout(() => {
      setItems(incomes);
    }, 10);
  }, [onMoving]);

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
        const getSheetsMove: number[] = getMoveing.map(
          (data) => data.sheetsIndex
        );
        onItemMoveing?.(getSheetsMove);
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
        <DroppableContainer id="droppable-1" className={className}>
          {items.map((income, index) => (
            <SortableItem
              key={`key-${income.indexOfList}`}
              id={`${income.indexOfList}`}
              noneMove={memoizedRenderItem(income, index)}
            >
              <div className="touch-none h-full p-2">
                index:{index} <br />
                sheetsIndex:{income.sheetsIndex}
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
