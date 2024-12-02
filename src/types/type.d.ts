declare type ApiResponse<T> = {
  status: number;
  code: number;
  message: string;
  content: T;
  error: null;
};
