// components/DroppableContainer.tsx
import React from "react";
import {
  SortableContext,
  rectSwappingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core/dist/types";

interface DroppableContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({
  id,
  children,
  className,
}) => {
  const items = React.Children.map(
    children,
    (child) => (child as React.ReactElement).props.id as UniqueIdentifier
  );

  return (
    <div className={className}>
      {items && (
        <SortableContext
          id={id}
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>
      )}
    </div>
  );
};

export default DroppableContainer;
