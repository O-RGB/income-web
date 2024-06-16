interface ILineChart {
  labels: string[];
  datasets: ILineChartDatasets[];
}

interface ILineChartDatasets {
  label?: string;
  data: number[];
  borderColor: string | string[];
  backgroundColor: string | string[];
  yAxisID: string;
  borderWidth: number;
}
