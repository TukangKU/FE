/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateJob, UpdateWorker } from "./types";
import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";

export const getWorkerProfile = async () => {
  try {
    const response = await axiosWithConfig.get(
      `https://tukangku.online/worker/2`
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const editWorkerProfile = async (body: UpdateWorker) => {
  try {
    const response = await axiosWithConfig.put(
      `https://tukangku.online/worker/2`,
      body
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getJobWorker = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs?status=accepted"
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailHistory = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/jobs/1"
    );
    return response.data as Response;
  } catch (error:any) {
    throw Error(error.response.data.message);
  }
};

export const updateJob = async (body: UpdateJob) => {
  try {
    const response = await axiosWithConfig.put(
      "https://tukangku.online/job/1",
      body
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
