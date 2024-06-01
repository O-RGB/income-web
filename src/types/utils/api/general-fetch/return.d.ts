interface IGeneralReturnFetch<T> {
  data?: T | undefined;
  success?: boolean;
  message?: string;
  time?: number; // ms
}
