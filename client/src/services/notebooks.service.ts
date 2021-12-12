import axios from "axios";
import { NotebookCreateDto, NotebookUpdateDto } from "../dtos/notebooks.dto";

export class ErrorResponse {
  constructor(public message: string) {}
}

const api = axios.create({
  baseURL: "/notebooks",
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    return Promise.reject(new ErrorResponse(err.response.data.message));
  }
);

export const create = async (notebookData: NotebookCreateDto) => {
  return await api.post(`/`, notebookData);
};

export const update = async (
  notebookId: string,
  notebookData: NotebookUpdateDto
) => {
  return await api.put(`/${notebookId}`, notebookData);
};

export const remove = async (notebookId: string) => {
  return await api.delete(`/${notebookId}`);
};
