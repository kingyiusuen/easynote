import axios from "axios";

const api = axios.create({ baseURL: "/users" });

export const getUserNotebooks = async (userId: string) => {
  return await api.get(`/${userId}/notebooks`);
};
