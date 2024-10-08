const crendentialKeys: { [key: string]: string } = {
  google_sheets: "google_sheets",
  wallpaper: "wallpaper",
  version: "version",
};

export const setLocal = (key: string, data: string) => {
  const setLocal = localStorage.setItem(crendentialKeys[key], data);
  return true;
};

export const getLocalByKey = async (keys: string) => {
  return localStorage.getItem(keys) || null;
};

export const destryoAllCredential = () => {
  localStorage.clear();
  return true;
};
