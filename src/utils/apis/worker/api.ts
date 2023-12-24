/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { ProfileType, Response } from "@/utils/types/api";
import { RequestParams, UpdateJobSchema, WorkerUpdateType } from "./types";

export const getWorkerProfile = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `https://tukangku.online/worker/${id}`
    );
    return response.data.data as ProfileType;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const editWorkerProfile = async (id: string, body: WorkerUpdateType) => {
  try {
    const response = await axiosWithConfig.put(
      `https://tukangku.online/client/${id}`,
      body
    );
    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getJobWorker = async (params?: RequestParams) => {
  try {
    let query = "";
    if (params) {
      const queryParams: string[] = [];

      let key: keyof typeof params;

      for (key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }

      query = queryParams.join("&");
    }

    const url = query
      ? `https://tukangku.online/jobs?${query}`
      : `https://tukangku.online/jobs`;

    const response = await axiosWithConfig.get(url);
    return response.data.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailJob = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `https://tukangku.online/jobs/${id}`
    );
    return response.data.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateJob = async (body: UpdateJobSchema, id: string) => {
  try {
    const response = await axiosWithConfig.put(
      `https://tukangku.online/jobs/${id}`,
      body
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
