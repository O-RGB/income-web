import {
  GOOGLE_LOCAL_KEY,
  WALLPAPER_LOCAL_KEY,
  VERSION_LOCAL_KEY,
} from "@/config/config";
import { getLocalByKey } from "@/libs/local";

export const LocalStorageAllData = async () => {
  let getUrl = await LocalStorageGoogleKey();
  let wallpaper = await LocalStorageWallpaper();
  let version = await LocalStorageVersion();
  return { getUrl, wallpaper, version };
};

export const LocalStorageGoogleKey = async () => {
  let getUrl = await getLocalByKey(GOOGLE_LOCAL_KEY);
  return getUrl;
};
export const LocalStorageWallpaper = async () => {
  let wallpaper = await getLocalByKey(WALLPAPER_LOCAL_KEY);
  return wallpaper;
};
export const LocalStorageVersion = async () => {
  let version = await getLocalByKey(VERSION_LOCAL_KEY);
  return version;
};
