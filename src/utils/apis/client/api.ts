/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProfileType } from "@/utils/types/api";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { ClientPostJobType, ClientUpdateType } from "./types";

export const getClientProfile = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(`/client/${id}`);
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
      }
    }

    const response = await axiosWithConfig.put(`/client/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const postJobDetail = async (body: ClientPostJobType) => {
  try {
    const response = await axiosWithConfig.post(`/jobs`, body);
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDataByService = async (serviceId: string) => {
  try {
    const response = await axiosWithConfig.get(`/worker?skill=${serviceId}`);
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getWorkerByID = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(`/worker/${id}`);
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const PostPayment = async (orderId: number, pricing: number) => {
  try {
    const response = await axiosWithConfig.post("/transaction", {
      job_id: orderId,
      job_price: pricing,
    });
    return response.data;
  } catch (error:any) {
    throw Error(error.response.data.message);
  }
};
