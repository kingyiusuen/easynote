import { IsString, IsNotEmpty } from "class-validator";

export class NotebookCreateDto {
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @IsNotEmpty()
  @IsString()
  public authorId!: string;
}

export class NotebookUpdateDto {
  @IsNotEmpty()
  @IsString()
  public name!: string;
}
