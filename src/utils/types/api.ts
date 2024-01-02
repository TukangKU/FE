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
  skill?: { skill_id: number; skill: string }[];
}

export type Pagination = {
  page: number;
  pagesize: number;
  totalPages: number;
};

export interface Category {
  image: string;
  name: string;
  description: string;
  id: number;
}
export interface Payment {
  transaction_id: string;
  job_id: string;
  job_price: string;
  status: number;
}