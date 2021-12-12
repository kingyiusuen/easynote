import axios from "axios";
import { UserCreateDto } from "../dtos/users.dto";

export class ErrorResponse {
  constructor(public message: string) {}
}

const api = axios.create({
  baseURL: "",
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    return Promise.reject(new ErrorResponse(err.response.data.message));
  }
);

export const login = async (userData: UserCreateDto) => {
  return await api.post("/login", userData);
};

export const signup = async (userData: UserCreateDto) => {
  return await api.post("/signup", userData);
};
