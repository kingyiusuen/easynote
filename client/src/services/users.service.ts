import createAxiosInstance from "../utils/createAxiosInstance";

const api = createAxiosInstance("/users");

export const getUserNotebooks = async (userId: string) => {
  return await api.get(`/${userId}/notebooks`);
};
