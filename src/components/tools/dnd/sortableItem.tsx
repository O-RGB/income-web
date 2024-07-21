// components/SortableItem.tsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  noneMove?: React.ReactNode;
  disabled?: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  children,
  noneMove,
  disabled,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  return (
    <div
      ref={disabled ? undefined : setNodeRef}
      style={style}
      {...attributes}
      className="flex gap-1 items-center h-full "
    >
      <div {...listeners} className="h-full">
        {children}
      </div>
      <div className="w-full">{noneMove}</div>
    </div>
  );
};

export default React.memo(SortableItem);
