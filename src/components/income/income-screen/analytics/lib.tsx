import { getColorPair } from "@/libs/color";

export const CalLineChart = (
  IGetDisplayCal: IGetDisplayCal,
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
  IGetDisplayCal.types.map((type) => {
    if (
      removeType
        ? type.type !== "ไม่มีหมวดหมู่" && type.type !== "รายจ่ายประจำ"
        : type.type !== "ไม่มีหมวดหมู่"
    ) {
      let { color, border } = getColorPair();
      colorBar.push(color);
      colorBarBorder.push(border);
      label.push(type.type);
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

export const CalSumOfMonth = (IGetDisplayCal: IGetDisplayCal) => {
  let ex: number = 0;
  let re: number = 0;
  IGetDisplayCal.calendar.map((data) => {
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

export const CalCalendarDay = (IGetDisplayCal: IGetDisplayCal) => {
  let data: ILineChart = {
    datasets: [],
    labels: [],
  };
  let label: string[] = [];
  let datasets: ILineChartDatasets[] = [];

  let ex: number[] = [];
  let re: number[] = [];
  IGetDisplayCal.calendar.map((data) => {
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
      yAxisID: "y1",
    },
    {
      label: "รายรับ",
      backgroundColor: color2,
      borderColor: border2,
      borderWidth: 2,
      data: re,
      yAxisID: "y1",
    },
  ];
  data = {
    datasets: datasets,
    labels: label,
  };

  return data;
};

export const meanOfDay = (IGetDisplayCal: IGetDisplayCal) => {
  let exMean: number = 0;
  let reMean: number = 0;

  IGetDisplayCal.calendar.map((data) => {
    exMean += data.value.expenses;
    reMean += data.value.revenue;
  });

  return {
    expenses: exMean / IGetDisplayCal.calendar.length,
    revenue: reMean / IGetDisplayCal.calendar.length,
  };
};
