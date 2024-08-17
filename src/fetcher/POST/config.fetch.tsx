"use client";
import { Fetcher } from "@/utils/fetch/fetch";
import { Config, ConfigList } from "@/utils/models/config";

export const FetchConfig = async (key: string) => {
  const res = await Fetcher<undefined, any[]>(key, {
    method: "POST",
    data: {
      query: "POST_get_config",
    },
  });
  if (res.success === true) {
    var config = new ConfigList();
    res.data?.map((list) => {
      config.addConfig(new Config(list[0], list[1]));
    });
    return config;
  }

  return undefined;
};
