import { IsNotEmpty } from "class-validator";

export class GetAuthDto {
  @IsNotEmpty({ message: "Username/Email is required" })
  identifier: string;

  @IsNotEmpty({ message: "Password is required" })
  password: string;
}
