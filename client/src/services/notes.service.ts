import axios from "axios";
import { NoteCreateDto, NoteUpdateDto } from "../dtos/notes.dto";

export class ErrorResponse {
  constructor(public message: string) {}
}

const api = axios.create({
  baseURL: "/notes",
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    return Promise.reject(new ErrorResponse(err.response.data.message));
  }
);

export const create = async (noteData: NoteCreateDto) => {
  return await api.post(`/`, noteData);
};

export const update = async (noteId: string, noteData: NoteUpdateDto) => {
  return await api.put(`/${noteId}`, noteData);
};

export const remove = async (noteId: string) => {
  return await api.delete(`/${noteId}`);
};
