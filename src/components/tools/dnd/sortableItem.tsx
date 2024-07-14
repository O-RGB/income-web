// components/SortableItem.tsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  noneMove?: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  children,
  noneMove,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="flex gap-3 items-center">
      <div {...listeners}>{children}</div>
      <div className="w-full">{noneMove}</div>
    </div>
  );
};

export default React.memo(SortableItem);
