import { IncomeModel } from "@/utils/models/income";
import { getDaysInMonth } from "./date-lib";

export const GetArrayDay = () => {
  const now = new Date();
  return getDaysInMonth(now.getMonth(), now.getFullYear());
};

export const GenArrayToKey = () => {
  let incomeOfDay: Map<number, IIncome[]> = new Map();
  const allDayOfMunth = GetArrayDay();
  allDayOfMunth.map((day) => {
    incomeOfDay.set(day, []);
  });
  return incomeOfDay;
};

const SetIncomeToArrayIndex = (data: IncomeModel[]) => {
  const arrayOfDay: Map<number, IIncome[]> = GenArrayToKey();
  data.map((data) => {
    const _im = arrayOfDay.get(data.day);
    if (_im) {
      arrayOfDay.set(data.day, [..._im, data.getIncome()]);
    } else {
      arrayOfDay.set(data.day, [data.getIncome()]);
    }
  });
  return arrayOfDay;
};

export const ConventIncomeSorting = (data: IncomeModel[]) => {
  let incommeByDay: IIncome[][] = [];
  const Maping = SetIncomeToArrayIndex(data);
  Maping.forEach((data, index) => {
    incommeByDay.push(data);
  });
  return incommeByDay;
};
