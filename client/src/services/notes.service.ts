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

type MergedUpdateDto = NoteUpdateDto | NoteMoveDto;

export const update = async (noteId: string, noteData: MergedUpdateDto) => {
  return await axios.put(`${baseURL}/${noteId}`, noteData);
};

export const remove = async (noteId: string) => {
  return await axios.delete(`${baseURL}/${noteId}`);
};
