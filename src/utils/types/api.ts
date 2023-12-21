/* eslint-disable @typescript-eslint/no-explicit-any */
export type Response<T = any> = {
    message: string;
    payload: T;
  };

export type RoleType = "client" | "worker";

export interface ProfileType {
  id?: number;
  username: string;
  nama: string;
  email: string;
  nohp: string;
  alamat: string;
  foto: string;
  role?: RoleType;
  skill?: null;
}