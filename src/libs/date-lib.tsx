import moment from "moment";
import "moment/locale/th"; // without this line it didn't work
moment.locale("th");

export function getDaysInMonth(month: number, year: number) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function DateFormat(
  date?: string | Date | undefined,
  format: string = "ll"
) {
  return moment(date).format(format);
}
