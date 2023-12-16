/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Response } from ".";

export const getWorkerProfile = async () => {
  try {
    const response = await axios.get(
      "https://virtserver.swaggerhub.com/MHAFIDZHIDAYAT_1/tukang/1.0.0/worker/1"
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const editWorkerProfile = async (body: Worker) => {
  try {
    const response = await axios.put(
      "https://virtserver.swaggerhub.com/MHAFIDZHIDAYAT_1/tukang/1.0.0/worker/1",
      body
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProfile = async (id: string) => {
  try {
    const response = await axios.delete(
      `https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/workers/${id}`
    );
    return response.data as Response;
  } catch (error:any) {
    throw Error(error.response.data.message);
  }
};

export const getSkillsWorker = async () => {
  try {
    const response = await axios.get(
      "https://virtserver.swaggerhub.com/be-tukangku/tukangku/1.0.0/skills"
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getJobWorker = async () => {
  try {
    const response = await axios.get(
      "https://virtserver.swaggerhub.com/MHAFIDZHIDAYAT_1/tukang/1.0.0/job/accepted"
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
