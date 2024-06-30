import { Sheet } from "react-modal-sheet";
import { useState } from "react";

import React from "react";
import { ColorPicker } from "antd";

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
        // snapPoints={[600, 600, 600, 0]}
        isOpen={isOpen ?? false}
        className="!z-40"
        onClose={() => {
          onClose?.();
        }}
        initialSnap={1}
      >
        <Sheet.Container layoutScroll>
          <Sheet.Header />
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
    </>
  );
};

export default ButtomSheets;
