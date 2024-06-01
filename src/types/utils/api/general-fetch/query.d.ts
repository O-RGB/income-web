type POSTQueryName = "POST_test" | "POST_insert_income" | "POST_delete_income";
type GETQueryName = "day" | "month" | "types";

interface IInitQuery {
  query?: POSTQueryName | GETQueryName;
}
