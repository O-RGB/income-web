// components/BarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: ILineChart;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "black",
        anchor: "end",
        align: "center",
        formatter: (value: any, context: any) =>
          context.chart.data.labels[context.dataIndex],
      },
    },
    scales: {
      y: {
        display: true,
        ticks: {
          maxTicksLimit: 6,
        },
      },
    },
  };

  return <Bar height={100} data={data} options={options} />;
};

export default BarChart;
