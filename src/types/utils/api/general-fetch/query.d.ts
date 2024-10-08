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
  | "POST_get_data_of_type"
  | "POST_get_day"
  | "POST_get_types"
  | "POST_get_dup"
  | "POST_get_display"
  | "POST_get_config";

type GETQueryName = "day" | "month" | "types" | "dup" | "display" | "config";

interface IInitQuery {
  query?: POSTQueryName | GETQueryName;
}
