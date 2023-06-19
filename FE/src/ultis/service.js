import axios from "axios";
import { apiURL } from "../Context/constant";
import { getToken } from "./Common";
export const serviceFetch = async (
  options,
  baseURL = apiURL,
  bearerToken,
  getdata = false
) => {
  const authenticationInfo = getToken();
  const http = axios.create();
  http.interceptors.request.use((config) => {
    return config;
  });
  http.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      // if (typeof window !== "undefined" && baseURL === API_URL) {
      //   switch (error?.response?.status) {
      //     case HTTP_STATUS_CODES.SERVICE_UNAVAILABLE: {
      //       window.location.replace("/503");
      //       break;
      //     }
      //     case HTTP_STATUS_CODES.NOT_FOUND:
      //       window.location.replace("/404");
      //       break;
      //     case HTTP_STATUS_CODES.UNAUTHORIZED:
      //       await signOut();
      //       window.location.replace("/app/login");
      //       break;
      //     case HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY:
      //       error.response.data.error = handleError(
      //         error.response.data.message
      //       );
      //       break;
      //     default:
      //       break;
      //   }
      // }
      return error?.response?.data;
    }
  );
  const res = await http({
    baseURL: baseURL,
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(!!bearerToken
        ? { Authorization: `Bearer ${bearerToken}` }
        : authenticationInfo
        ? { Authorization: `Bearer ${authenticationInfo}` }
        : {}),
      Accept: "application/json",
    },
  });
  if (!!res?.data?.data && !getdata) {
    return res?.data?.data;
  }
  if (!!res?.data) {
    return res?.data;
  }
  // TODO use table definition to get modal

  return res;
};
