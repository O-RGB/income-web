"use client";
const domain = process.env.API_URL;

const GetURL = (path: string) => {
  return `https://${domain}/${path}`;
};

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
      formData.append(key, params[key]);
    }
  });
  return formData;
}

export async function Fetcher<Input = any, Result = any>(
  key: string,
  param?: IFetcher<Input, IInitQuery>,
  loading?: (load: boolean) => void
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

  console.log(url);

  //FETCH
  return await fetch(url, {
    method: param?.method ? param.method : "GET",
    body: formParam,
    cache: "no-store",
    mode: "cors",
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
