type POSTQueryName =
  | "POST_test"
  | "POST_insert_income"
  | "POST_delete_income"
  | "POST_insert_income_on_day"
  | "POST_insert_incomes_list"
  | "POST_insert_type"
  | "POST_update_type"
  | "POST_delete_type"
  | "POST_edit_income"
  | "POST_move_rows_income"
type GETQueryName = "day" | "month" | "types" | "dup" | "display" | "config";

interface IInitQuery {
  query?: POSTQueryName | GETQueryName;
}
