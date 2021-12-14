import axios from "axios";

const baseURL = "/users";

export const getUserNotebooks = async (userId: string) => {
  return await axios.get(`${baseURL}/${userId}/notebooks`);
};
