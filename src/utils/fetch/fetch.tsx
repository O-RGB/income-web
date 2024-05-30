const apiUrl = process.env.API_URL;

function getDomain() {
  const environment = process.env.NEXT_PUBLIC_VERCEL_ENV;
  const isProduction = environment === "production";
  const isStaging = environment === "staging";
  const protocol = isProduction || isStaging ? "https" : "http";

  const domain = process.env.NEXT_PUBLIC_VERCEL_URL
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : "localhost:3000";

  if (!isProduction && domain === "localhost:3000") {
    return `${protocol}://${domain}`;
  }

  const urlObject = new URL(`${protocol}://${domain}`);
  const hostnameSplit = urlObject.hostname.split(".");
  const subdomain = hostnameSplit[0].split("-")[0];
  const secondLevelDomain = hostnameSplit[1];
  const topLevelDomain = hostnameSplit[2];

  const finalDomain = `${subdomain}.${secondLevelDomain}.${topLevelDomain}`;
  return `${protocol}://${finalDomain}`;
}

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
  url: string,
  param?: IFetcher<Input, IInitQuery>,
  loading?: (load: boolean) => void,
  headers: any = undefined
) {

  var realUrl = getDomain();
  console.log(realUrl)
  //LOAD
  loading?.(true);
  //GET
  var url: string =
    param?.method === "GET" || param?.method === undefined
      ? url + QueryGet(param?.data)
      : url;
  //POST
  var formParam: FormData | undefined =
    param?.method === "POST" ? QueryPost(param.data) : undefined;

  console.log(apiUrl);

  //FETCH
  return await fetch(url, {
    method: param?.method ? param.method : "GET",
    body: formParam,
  })
    .then((response) => {
      return response.json() as IGeneralReturnFetch<Result>;
    })
    .catch((error) => {
      return {
        success: false,
        message: error,
      } as IGeneralReturnFetch<undefined>;
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
