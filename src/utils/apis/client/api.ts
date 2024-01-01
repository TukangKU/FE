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
      `https://tukangku.online/jobs`,
      body
    );
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDataByService = async (serviceId: string) => {
  try {
    const response = await axiosWithConfig.get(
      `https://tukangku.online/worker?skill=${serviceId}`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getWorkerByID = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `https://tukangku.online/worker/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const PostPayment = async (orderId: number, pricing: number) => {
  try {
    const response = await axiosWithConfig.post(
      "https://tukangku.online/transaction",
      {
        job_id: orderId,
        job_price: pricing,
      }
    );

    const snapToken: string = response.data.data.token;
    if (!snapToken) {
      throw new Error("snapToken is required");
    }

    return snapToken;
  } catch (error) {
    throw new Error("Error processing payment");
  }
};
