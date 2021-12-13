import { Note } from "../types";

export interface NotebookCreateDto {
  userId: string;
  name: string;
}

export interface NotebookUpdateDto {
  name: string;
}

export interface NotebookReadDto {
  id: string;
  name: string;
  notes: Note[];
}
