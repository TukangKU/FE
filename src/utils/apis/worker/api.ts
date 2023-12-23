/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { ProfileType, Response } from "@/utils/types/api";
import {
  RequestParams,
  UpdateJobSchema,
  UpdateNegotiationSchema,
  WorkerUpdateType,
} from "./types";

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
      ? `https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs?${query}`
      : `https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs`;

    const response = await axiosWithConfig.get(url);
    return response.data.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailJob = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs/1"
    );
    return response.data.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateNegotiation = async (body: UpdateNegotiationSchema) => {
  try {
    const response = await axiosWithConfig.put(
      "https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs/1",
      body
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateJob = async (body: UpdateJobSchema) => {
  try {
    const response = await axiosWithConfig.put(
      "https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs/1",
      body
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
