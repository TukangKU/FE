  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { ProfileType } from "@/utils/types/api";
  import axiosWithConfig from "@/utils/apis/axiosWithConfig";
  import { ClientUpdateType } from "./types";

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

  export const updateProfile = async (id:string, body: ClientUpdateType) => {
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

  export const getDataByService = async (serviceId: number) => {
    try {
      const response = await axiosWithConfig.get(
        `https://tukangku.online/users/skill?skill=${serviceId}`,
      );
      return response.data;
    } catch (error: any) {
      throw Error(error.response.data.message);
    }
  };

  export const getWorkerByID = async (id: number) => {
    try {
      const response = await axiosWithConfig.get(
        `https://tukangku.online/worker/${id}`,
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
  
      console.log(response);
  
      const snapToken: string = response.data.data.token;
      if (!snapToken) {
        throw new Error('snapToken is required'); 
      }
  
      return snapToken;
    } catch (error) {
      console.error("Error processing payment:", error);
      throw new Error('Error processing payment');
    }
  };