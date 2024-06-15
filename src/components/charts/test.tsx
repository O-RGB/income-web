import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      ticks: {
        maxTicksLimit: 6, // กำหนดให้แสดงตัวเลขสูงสุด 6 อัน
      },
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        maxTicksLimit: 6, // กำหนดให้แสดงตัวเลขสูงสุด 6 อัน
      },
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

interface LineChartProps {
  data: ILineChart;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return <Line height={50} width={"100%"} options={options} data={data} />;
};

export default LineChart;
