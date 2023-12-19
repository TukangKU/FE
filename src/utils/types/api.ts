/* eslint-disable @typescript-eslint/no-explicit-any */
export type Response<T = any> = {
    message: string;
    payload: T;
  };