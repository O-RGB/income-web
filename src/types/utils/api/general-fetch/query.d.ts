type POSTQueryName =
  | "POST_test"
  | "POST_insert_income"
  | "POST_delete_income"
  | "POST_insert_income_on_day";
type GETQueryName = "day" | "month" | "types";

interface IInitQuery {
  query?: POSTQueryName | GETQueryName;
}
