interface ILineChart {
  labels: string[];
  datasets: ILineChartDatasets[];
}

interface ILineChartDatasets {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  yAxisID: string;
}
