export interface Result<T> {
  id:      string;
  message: string;
  date?:    Date;
  result?:  T;
}

export interface ErrorResult {
  id:      string;
  message: string;
  date?:    Date;
}