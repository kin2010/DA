import axios from "axios";
import config from "../configs/appConfig";
import { AxiosResponse, AxiosRequestConfig } from "axios";

type FetchType = {
  options: AxiosRequestConfig;
  baseURL?: string;
};

export const serviceFetch = async (
  options: AxiosRequestConfig,
  baseURL = config.apiURL
) => {
  const http = axios.create();
  http.interceptors.request.use((config) => {
    return config;
  });
  http.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      return error?.response?.data;
    }
  );
  const res = await http({
    baseURL: baseURL,
    ...options,
    headers: {
      ...(options.headers || {}),
      Accept: "application/json",
    },
  }).catch((error: any) => {
    if (error?.data) {
      return error?.data;
    }
  });
  if (!!res?.data) {
    return res?.data;
  }
  // TODO use table definition to get modal

  return res;
};
