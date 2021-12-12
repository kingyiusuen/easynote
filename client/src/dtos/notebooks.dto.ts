import { NoteReadDto } from "./notes.dto";

export interface NotebookCreateDto {
  authorId: string;
  name: string;
}

export interface NotebookUpdateDto {
  name: string;
}

export interface NotebookReadDto {
  id: string;
  name: string;
  notes: NoteReadDto[];
}
