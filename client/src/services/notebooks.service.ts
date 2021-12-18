import axios from "axios";
import {
  NotebookCreateDto,
  NotebookRenameDto,
} from "../actions/notebooks.action";

const baseURL = "/api/notebooks";

export const create = async (notebookData: NotebookCreateDto) => {
  return await axios.post(`${baseURL}/`, notebookData);
};

export const update = async (
  notebookId: string,
  notebookData: NotebookRenameDto
) => {
  return await axios.put(`${baseURL}/${notebookId}`, notebookData);
};

export const remove = async (notebookId: string) => {
  return await axios.delete(`${baseURL}/${notebookId}`);
};
