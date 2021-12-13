import axios from "axios";
import { ErrorResponse } from "../types";

const createAxiosInstance = (baseURL: string) => {
  const api = axios.create({ baseURL });

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      return Promise.reject(new ErrorResponse(err.response.data.message));
    }
  );

  return api;
};

export default createAxiosInstance;
