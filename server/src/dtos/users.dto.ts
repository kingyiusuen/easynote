import { IsString, IsNotEmpty } from "class-validator";

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  public username!: string;

  @IsNotEmpty()
  @IsString()
  public password!: string;
}
