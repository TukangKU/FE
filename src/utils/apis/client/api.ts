/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProfileType } from "@/utils/types/api";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { ClientPostJobType, ClientUpdateType } from "./types";

export const getClientProfile = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `https://tukangku.online/client/${id}`
    );
    return response.data.data as ProfileType;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateProfile = async (id: string, body: ClientUpdateType) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;
    for (key in body) {
      if (body[key]) {
        formData.append(key, body[key]);
        console.log(key, body[key]);
      }
    }

    const response = await axiosWithConfig.put(
      `https://tukangku.online/client/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const postJobDetail = async (body: ClientPostJobType) => {
  try {
    const response = await axiosWithConfig.post(
      `https://tukangku.online/jobs`, body
    );
      console.log('response post job', response)
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDataByService = async (serviceId: number) => {
  try {
    const response = await axiosWithConfig.get(
      `https://tukangku.online/users/skill?skill=${serviceId}`,
    );
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getWorkerByID = async (id: number) => {
  try {
    const response = await axiosWithConfig.get(
      `https://tukangku.online/takeworker?id=${id}`,
    );
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};