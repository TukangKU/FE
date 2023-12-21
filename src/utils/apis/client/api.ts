import axios from "axios";
import { Response } from ".";
import { UpdateClient } from "./types";

export const getClientProfile = async () => {
  try {
    const response = await axios.get(
      "https://virtserver.swaggerhub.com/MHAFIDZHIDAYAT_1/tukang/1.0.0/client/2"
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const editClientProfile = async (body: UpdateClient) => {
  try {
    const response = await axios.put(
      "https://virtserver.swaggerhub.com/MHAFIDZHIDAYAT_1/tukang/1.0.0/client/2",
      body
    );
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
