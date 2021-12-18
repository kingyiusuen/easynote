import axios from "axios";
import { UsernamePassword } from "../actions/session.action";

const baseURL = "/api";

export const login = async (userData: UsernamePassword) => {
  return await axios.post(`${baseURL}/login`, userData);
};

export const signup = async (userData: UsernamePassword) => {
  return await axios.post(`${baseURL}/signup`, userData);
};
