import axios from "axios";
import { NotebookCreateDto, NotebookUpdateDto } from "../dtos/notebooks.dto";

const api = axios.create({ baseURL: "/notebooks" });

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
