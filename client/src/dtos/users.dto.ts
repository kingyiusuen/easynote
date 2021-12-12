import { NotebookReadDto } from "./notebooks.dto";

export interface UserCreateDto {
  username: string;
  password: string;
}

export interface UserReadDto {
  id: string;
  username: string;
  notebooks: NotebookReadDto[];
}
