import { IsString, IsNotEmpty } from "class-validator";

export class NoteCreateDto {
  @IsNotEmpty()
  @IsString()
  public notebookId!: string;
}

export class NoteUpdateDto {
  @IsNotEmpty()
  @IsString()
  public title!: string;

  @IsNotEmpty()
  @IsString()
  public content!: string;
}
