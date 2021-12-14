import axios from "axios";
import { NoteCreateDto, NoteUpdateDto } from "../dtos/notes.dto";

const baseURL = "/notes";

export const create = async (noteData: NoteCreateDto) => {
  return await axios.post(`${baseURL}/`, noteData);
};

export const update = async (noteId: string, noteData: NoteUpdateDto) => {
  return await axios.put(`${baseURL}/${noteId}`, noteData);
};

export const remove = async (noteId: string) => {
  return await axios.delete(`${baseURL}/${noteId}`);
};
