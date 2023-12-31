/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { LoginType, RegisterType } from ".";
import { Response } from "@/utils/types/api";

export const userLogin = async (body: LoginType) => {
  try {
    const response = await axiosWithConfig.post(`/login`, body);

    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const userRegister = async (body: RegisterType) => {
  try {
    const response = await axiosWithConfig.post(`/register`, body);
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
