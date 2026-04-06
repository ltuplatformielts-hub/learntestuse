import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;
}

export class ChangePasswordDto {
  @IsNotEmpty({ message: "New password is required" })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: "New password is not strong enough" },
  )
  newPassword: string;
}
