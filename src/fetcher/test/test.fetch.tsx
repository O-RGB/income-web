import { Fetcher } from "@/utils/fetch/fetch";

export const FetchTest = (
  input: IPostTest,
  loading?: (load: boolean) => void
) => {
  return Fetcher<IPostTest, IPostTestReturn>(
    "https://script.google.com/macros/s/AKfycbyZKMl6AL-GiCjOu8qmlGZjhpXi9UHkq2UQtP2lUyuha24lGZsrwZnsaoDslUd3rjUKUA/exec",
    {
      method: "POST",
      data: {
        query: "POST_test",
        checked: false,
        data: 434,
        test: "",
      },
    },
    loading
  );
};
