import axios from "axios";
import {
  NoteCreateDto,
  NoteUpdateDto,
  NoteMoveDto,
} from "../actions/notes.action";

const baseURL = "/notes";

export const create = async (noteData: NoteCreateDto) => {
  return await axios.post(`${baseURL}/`, noteData);
};

export const update = async (noteId: string, noteData: NoteUpdateDto) => {
  return await axios.put(`${baseURL}/${noteId}`, noteData);
};

export const move = async (noteId: string, noteData: NoteMoveDto) => {
  return await axios.put(`${baseURL}/${noteId}/move`, noteData);
};
export const remove = async (noteId: string) => {
  return await axios.delete(`${baseURL}/${noteId}`);
};
