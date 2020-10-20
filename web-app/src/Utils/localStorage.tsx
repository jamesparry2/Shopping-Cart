export const appendToStorage = (key: string, value: any) => {
  if (isLocalStorageKeyInUse(key)) {
    const currentItems = getFromLocalStorage(key);
    setToLocalStorage(key, currentItems.concat(value));
  } else {
    setToLocalStorage(key, new Array(value));
  }
};

export const getFromLocalStorage = (key: string) =>
  JSON.parse(window.localStorage.getItem(key) || "");

export const setToLocalStorage = (key: string, value: any) =>
  window.localStorage.setItem(key, JSON.stringify(value));

const isLocalStorageKeyInUse = (key: string) =>
  window.localStorage.getItem(key) != null;
