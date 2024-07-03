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
  indexAxis?: string;
  height?: string | number | undefined;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  indexAxis,
  height = 100,
}) => {
  const options = {
    indexAxis: indexAxis as any,
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

  return <Bar height={height} data={data} options={options} />;
};

export default BarChart;
