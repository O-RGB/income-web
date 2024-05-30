type POSTQueryName = "POST_test";
type GETQueryName = "day" | "month";

interface IInitQuery {
  query?: POSTQueryName | GETQueryName;
}
