import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateAuthDto {
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsNotEmpty({ message: "Username is required" })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  })
  @MinLength(5, { message: "Username must be at least 5 characters long" })
  @MaxLength(20, { message: "Username must be at most 20 characters long" })
  username: string;

  @IsNotEmpty({ message: "Full name is required" })
  @IsString({ message: "Full name must be a string" })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: "Full name can only contain letters and spaces",
  })
  fullName: string;

  @IsNotEmpty({ message: "Phone number is required" })
  @IsPhoneNumber("VN", { message: "Invalid phone number format" })
  phoneNumber: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: "Password is not strong enough" },
  )
  password: string;

  @IsOptional()
  @IsString({ message: "User Code must be a string" })
  userCode?: string;
}
