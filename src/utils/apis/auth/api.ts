/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { LoginType, RegisterType } from ".";

export const userLogin = async (body: LoginType) => {
  try {
    const response = await axiosWithConfig.post(`/login`, body);

    return response.data as { token: string };
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
