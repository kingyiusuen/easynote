import { UsernamePassword } from "../actions/auth.action";
import createAxiosInstance from "../utils/createAxiosInstance";

const api = createAxiosInstance("/");

export const login = async (userData: UsernamePassword) => {
  return await api.post("/login", userData);
};

export const signup = async (userData: UsernamePassword) => {
  return await api.post("/signup", userData);
};
