import { NotebookCreateDto, NotebookUpdateDto } from "../dtos/notebooks.dto";
import createAxiosInstance from "../utils/createAxiosInstance";

const api = createAxiosInstance("/notebooks");

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
