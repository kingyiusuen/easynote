import { NotebookReadDto } from "./notebooks.dto";

export interface UserReadDto {
  id: string;
  username: string;
}

export interface UserReadNotebookDto {
  notebooks: NotebookReadDto[];
}
