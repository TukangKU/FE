import axios from "axios";

let bearerToken = "";
const axiosWithConfig = axios.create();

export const setAxiosConfig = (token: string) => {
  bearerToken = token;
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;
  axiosConfig.baseURL = import.meta.env.VITE_BASE_URL;
  return axiosConfig;
});

export default axiosWithConfig;
