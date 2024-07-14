import { Modal } from "antd";
import React from "react";
import Calculator from "../../common/calculator";

interface CalculatorModalsProps {
  open: boolean;
  onClose?: () => void;
}

const CalculatorModals: React.FC<CalculatorModalsProps> = ({
  open,
  onClose,
}) => {
  return (
    <>
      <Modal
        classNames={{
          content: "!p-0",
        }}
        open={open}
        footer={<></>}
        onClose={onClose}
        onCancel={onClose}
        width={"18rem"}
      >
        <Calculator></Calculator>
      </Modal>
    </>
  );
};

export default CalculatorModals;
