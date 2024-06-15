type POSTQueryName =
  | "POST_test"
  | "POST_insert_income"
  | "POST_delete_income"
  | "POST_insert_income_on_day"
  | "POST_insert_incomes_list";
type GETQueryName = "day" | "month" | "types" | "dup" | "display";

interface IInitQuery {
  query?: POSTQueryName | GETQueryName;
}
