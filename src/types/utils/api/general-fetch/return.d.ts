interface IGeneralReturnFetch<T> {
  data?: T;
  success?: boolean;
  message?: string;
  time?: number; // ms
}
