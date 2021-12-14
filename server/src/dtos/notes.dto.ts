import { IsString, IsNotEmpty } from "class-validator";

export class NoteCreateDto {
  @IsNotEmpty()
  @IsString()
  public notebookId!: string;
}

export class NoteUpdateDto {
  @IsString()
  public title!: string;

  @IsString()
  public content!: string;
}
