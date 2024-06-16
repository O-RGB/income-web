import LineChart from "@/components/charts/test";
import { Modal } from "antd";
import React from "react";

interface AnalyticsProps {
  open: boolean;
  close?: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ open, close }) => {
  return (
    <>
      <Modal open={open} onClose={close} onCancel={close}>
        <div className="h-full">
          {/* <LineChart></LineChart> */}
          รอการพัฒนา
        </div>
      </Modal>
    </>
  );
};

export default Analytics;
