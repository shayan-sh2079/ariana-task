import baseAxios from "#/services/baseAxios.ts";
import Cookies from "js-cookie";
import { ACCESS_TKN_KEY } from "#/constants/auth.ts";

baseAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get(ACCESS_TKN_KEY);

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default baseAxios;
