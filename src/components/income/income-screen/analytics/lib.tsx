import { getColorPair } from "@/libs/color";
import { MapingTypeToLabel } from "@/libs/income-lib";

export const CalTypeOfDay = (master: IMasterDataImcomes) => {
  let chartData: ILineChart[] = [
    {
      datasets: [],
      labels: [],
    },
  ];
  let label: string[] = new Array(31).fill(null).map((_, i) => `${i + 1}`);

  master.IGetDisplayCal?.types.map((data, index) => {
    let { color, border } = getColorPair();

    chartData.push({
      labels: label,
      datasets: [
        {
          backgroundColor: color,
          borderColor: border,
          borderWidth: 1,
          data: label.map((l) => {
            const plot = data.plot.find((d) => d.day === +l);
            return plot ? plot.expenses : 0;
          }),
          yAxisID: "y",
          label: MapingTypeToLabel(master.typesOfItems, data.type) ?? "ไม่มีหมวดหมู่",
        },
      ],
    });
  });

  return chartData;
};

export const CalLineChart = (
  master: IMasterDataImcomes,
  removeType: boolean = true
) => {
  let data: ILineChart = {
    datasets: [],
    labels: [],
  };
  let label: string[] = [];
  let datasets: ILineChartDatasets[] = [];
  let sumBar: number[] = [];
  let colorBar: string[] = [];
  let colorBarBorder: string[] = [];
  master.IGetDisplayCal?.types.map((type) => {
    if (
      removeType
        ? type.type !== "T00" && type.type !== "รายจ่ายประจำ"
        : type.type !== "T00"
    ) {
      let { color, border } = getColorPair();
      colorBar.push(color);
      colorBarBorder.push(border);
      label.push(MapingTypeToLabel(master.typesOfItems, type.type) ?? "");
      let count = type.plot.map((r) => r.expenses);
      let sum = count.reduce((partialSum, a) => partialSum + a, 0);
      sumBar.push(sum);
    }
  });
  datasets = [
    {
      label: "label",
      backgroundColor: colorBar,
      borderColor: colorBarBorder,
      borderWidth: 2,
      data: sumBar,
      yAxisID: "y",
    },
  ];
  data = {
    datasets: datasets,
    labels: label,
  };

  return data;
};

export const CalSumOfMonth = (master: IMasterDataImcomes) => {
  let ex: number = 0;
  let re: number = 0;
  master.IGetDisplayCal?.calendar.map((data) => {
    ex += data.value.expenses;
    re += data.value.revenue;
  });
  let data: ILineChart = {
    datasets: [],
    labels: [],
  };
  let label: string[] = ["รายจ่าย", "รายรับ"];
  let datasets: ILineChartDatasets[] = [];
  let { color, border } = getColorPair();
  datasets = [
    {
      label: "",
      backgroundColor: color,
      borderColor: border,
      borderWidth: 2,
      data: [ex, re],
      yAxisID: "y",
    },
  ];
  data = {
    datasets: datasets,
    labels: label,
  };

  return data;
};

export const CalCalendarDay = (master: IMasterDataImcomes) => {
  let data: ILineChart = {
    datasets: [],
    labels: [],
  };
  let label: string[] = [];
  let datasets: ILineChartDatasets[] = [];

  let ex: number[] = [];
  let re: number[] = [];
  master.IGetDisplayCal?.calendar.map((data) => {
    data.day;
    label.push(`${data.day}`);
    ex.push(data.value.expenses);
    re.push(data.value.revenue);
  });
  let { color, border } = getColorPair();
  let { color: color2, border: border2 } = getColorPair();
  datasets = [
    {
      label: "รายจ่าย",
      backgroundColor: color,
      borderColor: border,
      borderWidth: 2,
      data: ex,
      yAxisID: "y",
    },
    {
      label: "รายรับ",
      backgroundColor: color2,
      borderColor: border2,
      borderWidth: 2,
      data: re,
      yAxisID: "y",
    },
  ];
  data = {
    datasets: datasets,
    labels: label,
  };

  return data;
};

export const meanOfDay = (master: IMasterDataImcomes) => {
  let exMean: number = 0;
  let reMean: number = 0;
  if (!master.IGetDisplayCal?.calendar) {
    return {
      expenses: 0,
      revenue: 0,
    };
  }

  master.IGetDisplayCal?.calendar.map((data) => {
    exMean += data.value.expenses;
    reMean += data.value.revenue;
  });

  return {
    expenses: exMean / master.IGetDisplayCal.calendar.length,
    revenue: reMean / master.IGetDisplayCal.calendar.length,
  };
};
