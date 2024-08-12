interface IFetcher<Input = any, query = any> {
  data?: Input | query;
  method?: "GET" | "POST";
}

function QueryGet(params: any): string {
  const queryString = Object.keys(params)
    .filter((key) => params[key] !== undefined)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return `?${queryString}`;
}

function QueryPost(params: any): FormData {
  const formData = new FormData();
  Object.keys(params).map((key) => {
    if (params[key] !== undefined) {
      if (Array.isArray(params[key])) {
        formData.append(key, JSON.stringify(params[key]));
      } else {
        formData.append(key, params[key]);
      }
    }
  });

  return formData;
}

export async function Fetcher<Input = any, Result = any>(
  key: string,
  param?: IFetcher<Input, IInitQuery>,
  loading?: (load: boolean) => void,
  signal?: AbortSignal,
  cache?: RequestCache | undefined
): Promise<IGeneralReturnFetch<Result | undefined>> {
  //LOAD
  loading?.(true);
  //GET
  var url: string = "https://script.google.com/macros/s/" + key;

  if (!url.endsWith("exec")) {
    url = url + "/exec";
  }

  url =
    param?.method === "GET" || param?.method === undefined
      ? url + QueryGet(param?.data)
      : url;

  //POST
  var formParam: FormData | undefined =
    param?.method === "POST" ? QueryPost(param.data) : undefined;

    console.log(formParam)

  //FETCH
  return await fetch(url, {
    method: param?.method ? param.method : "GET",
    body: formParam,
    signal: signal,
    // cache: "no-store",
    // mode: "cors",
    cache: cache ?? "no-cache",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return {
        success: false,
        message: error,
      };
    })
    .finally(() => {
      loading?.(false);
    });
}

export async function FetcherAll(
  fetchs: Promise<any>[] = [],
  loading?: (load: boolean) => void
) {
  //LOAD
  loading?.(true);
  return await Promise.all(fetchs)
    .then((data) => {
      return data;
    })
    // .catch((error) => {
    //   return {
    //     success: false,
    //     message: error,
    //   } as IGeneralReturnFetch<undefined>;
    // })
    .finally(() => {
      loading?.(false);
    });
}
