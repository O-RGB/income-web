// components/DraggableItem.tsx
import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableItemProps {
  id: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      Draggable Item {id}
    </div>
  );
};

export default DraggableItem;
