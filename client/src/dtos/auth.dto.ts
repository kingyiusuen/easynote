import { UserReadDto } from "./users.dto";

export interface LoginSuccessDto {
  user: UserReadDto;
  token: string;
}

export interface SignupSuccessDto {
  message: string;
}
