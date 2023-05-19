import { apiURL } from "../Context/constant";
import axiosClient from "./AxiosClient";
const LoginApi = {
  login: async (params) => {
    const url = `${apiURL}/api/login`;
    return await axiosClient.post(url, { ...params });
  },
};
export default LoginApi;
