import { Sheet } from "react-modal-sheet";
import { useState } from "react";

import React from "react";

interface ButtomSheetsProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const ButtomSheets: React.FC<ButtomSheetsProps> = ({
  onClose,
  children,
  isOpen,
}) => {
  return (
    <>
      <Sheet
        snapPoints={[600, 400, 100, 0]}
        isOpen={isOpen ?? false}
        onClose={() => {
          onClose?.();
        }}
        initialSnap={1}
        onSnap={(snapIndex) =>
          console.log("> Current snap point index:", snapIndex)
        }
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{/* Your sheet content goes here */}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
    </>
  );
};

export default ButtomSheets;
