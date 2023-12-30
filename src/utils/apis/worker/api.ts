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
    console.log("body", body);
    const formData = new FormData();
    let key: keyof typeof body;
    for (key in body) {
      if (body[key]) {
        if (Array.isArray(body[key])) {
          for (const val of body[key]) {
            formData.append(key, val.value);
          }
        } else {
          formData.append(key, body[key]);
        }
      }
    }

    const response = await axiosWithConfig.put(
      `https://tukangku.online/worker/${id}`,
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
      ? `https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs?${query}`
      : `https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs`;

    const response = await axiosWithConfig.get(url);
    return response.data.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

// TODO: change hardcode param
export const getDetailJob = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs/${id}`
    );
    return response.data.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

// TODO: change hardcode param
export const updateJob = async (body: UpdateJobSchema, id: string) => {
  try {
    const response = await axiosWithConfig.put(
      `https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs/${id}`,
      body
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
