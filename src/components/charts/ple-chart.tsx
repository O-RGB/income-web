import React from "react";
import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BarChartProps {
  data: ILineChart;
  height?: string | number | undefined;
}

const PieChart: React.FC<BarChartProps> = ({ data, height }) => {
  return <Pie data={data} height={height}></Pie>;
};

export default PieChart;
