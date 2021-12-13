import axios from "axios";
import { NoteCreateDto, NoteUpdateDto } from "../dtos/notes.dto";

const api = axios.create({ baseURL: "/notes" });

export const create = async (noteData: NoteCreateDto) => {
  return await api.post(`/`, noteData);
};

export const update = async (noteId: string, noteData: NoteUpdateDto) => {
  return await api.put(`/${noteId}`, noteData);
};

export const remove = async (noteId: string) => {
  return await api.delete(`/${noteId}`);
};
