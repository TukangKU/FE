/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { ProfileType, Response } from "@/utils/types/api";
import { WorkerUpdateType } from "./types";

export const getWorkerProfile = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `https://tukangku.online/worker/${id}`
    );
    console.log("response worker", response.data.data);
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

export const getSkillsWorker = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/skills"
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getJobWorker = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://virtserver.swaggerhub.com/MHAFIDZHIDAYAT_1/tukang/1.0.0/job/accepted"
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
