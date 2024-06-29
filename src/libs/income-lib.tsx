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

export const MapingTypeToLabel = (
  typesOfItems?: IIncomeTypes[],
  typeId?: string
) => {
  if (typeId) {
    if (typeId.length > 0) {
      if (typeId === "T00") {
        return undefined;
      }
      const findType: IIncomeTypes | undefined = typesOfItems?.find(
        (data) => data.typeId === typeId
      );
      if (findType) {
        return findType.name;
      }
    }
  }
};

// const SetIncomeToArrayIndex = (data: IncomeModel[]) => {
//   const arrayOfDay: Map<number, IIncome[]> = GenArrayToKey();
//   data.map((data) => {
//     const _im = arrayOfDay.get(data.day);
//     if (_im) {
//       arrayOfDay.set(data.day, [..._im, data.getIncome()]);
//     } else {
//       arrayOfDay.set(data.day, [data.getIncome()]);
//     }
//   });
//   return arrayOfDay;
// };

// export const ConventIncomeSorting = (data: IncomeModel[]) => {
//   let incommeByDay: IIncome[][] = [];
//   const Maping = SetIncomeToArrayIndex(data);
//   Maping.forEach((data, index) => {
//     incommeByDay.push(data);
//   });
//   return incommeByDay;
// };
