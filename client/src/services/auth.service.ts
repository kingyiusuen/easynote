import axios from "axios";
import { UsernamePassword } from "../actions/auth.action";

const api = axios.create({ baseURL: "/" });

export const login = async (userData: UsernamePassword) => {
  return await api.post("/login", userData);
};

export const signup = async (userData: UsernamePassword) => {
  return await api.post("/signup", userData);
};
