import axios from "axios";
import { UsernamePassword } from "../actions/session.action";

export const login = async (userData: UsernamePassword) => {
  return await axios.post("/login", userData);
};

export const signup = async (userData: UsernamePassword) => {
  return await axios.post("/signup", userData);
};
