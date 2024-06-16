import BarChart from "@/components/charts/bar-chart";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { CalCalendarDay, CalLineChart, CalSumOfMonth, meanOfDay } from "./lib";
import LineChart from "@/components/charts/line-chart";
import { NumberFormat } from "@/libs/number";

interface AnalyticsProps {
  open: boolean;
  close?: () => void;
  IGetDisplayCal?: IGetDisplayCal;
}

const Analytics: React.FC<AnalyticsProps> = ({
  open,
  close,
  IGetDisplayCal,
}) => {
  // const BarChart = () => {
  //   IGetDisplayCal?.types
  // }

  const [chartData, setChartData] = useState<ILineChart>();
  const [chartSumData, setChartSumData] = useState<ILineChart>();
  const [chartDayData, setChartDayData] = useState<ILineChart>();
  const [mendOfDay, setMendOfDay] = useState<{
    expenses: number;
    revenue: number;
  }>({
    expenses: 0,
    revenue: 0,
  });

  useEffect(() => {
    if (IGetDisplayCal) {
      const data = CalLineChart(IGetDisplayCal, false);
      setChartData(data);
      const sum = CalSumOfMonth(IGetDisplayCal);
      setChartSumData(sum);
      const day = CalCalendarDay(IGetDisplayCal);
      setChartDayData(day);
      const { expenses, revenue } = meanOfDay(IGetDisplayCal);
      setMendOfDay({ expenses, revenue });
    }
  }, [IGetDisplayCal, open]);

  return (
    <>
      <Modal destroyOnClose open={open} onClose={close} onCancel={close}>
        <div className="flex flex-col gap-4 ">
          {/* <LineChart></LineChart> */}

          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">เฉลี่ยรับจ่ายต่อวัน</div>
            {mendOfDay && (
              <div className="flex gap-2 w-full">
                <div className="p-2 border rounded-md shadow-sm w-full">
                  <div className="font-bold text-md">รายจ่าย</div>
                  <div className="flex justify-center items-center text-lg font-bold gap-2">
                    <div>{NumberFormat(mendOfDay.expenses)}</div>{" "}
                    <div className="text-sm text-gray-400">บาท / วัน</div>
                  </div>
                </div>
                <div className="p-2 border rounded-md shadow-sm w-full">
                  <div className="font-bold text-md">รายรับ</div>
                  <div className="flex justify-center items-center text-lg font-bold gap-2">
                    <div>{NumberFormat(mendOfDay.revenue)}</div>{" "}
                    <div className="text-sm text-gray-400">บาท / วัน</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">สรุปข้อมูลรายหมวดหมู่</div>
            {chartData && <BarChart height={200} data={chartData}></BarChart>}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">สรุปรายรับจ่ายเดือนนี้</div>
            {chartSumData && (
              <BarChart
                indexAxis="y"
                height={100}
                data={chartSumData}
              ></BarChart>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">สรุปรายรับจ่ายเดือนนี้</div>
            {chartDayData && <LineChart data={chartDayData}></LineChart>}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Analytics;
