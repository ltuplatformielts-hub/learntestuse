import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto.js";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserRole } from "../user/entities/user.entity.js";
import { Repository } from "typeorm";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import "dotenv/config";
import { GetAuthDto } from "./dto/get-auth.dto.js";
import { ResetPasswordDto } from "./dto/update-auth.dto.js";

const userRole = {
  "535455": "STUDENT",
  "544541": "TEACHER",
  "41444d": "ADMIN",
};

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(
    @InjectRepository(User, "supabase")
    private userRepository: Repository<User>,
  ) {
    this.supabase = createClient(
      process.env.SUPABASE_URL ?? "",
      process.env.SUPABASE_KEY ?? "",
    );
  }
  async register(createAuthDto: CreateAuthDto) {
    try {
      const { email, username, fullName, phoneNumber, password, userCode } =
        createAuthDto;

      const isExistingUser = await this.userRepository.findOne({
        where: { email, username },
      });

      if (isExistingUser) {
        throw new ConflictException("Email or username already exists");
      }

      const role: UserRole = userCode
        ? (userRole[userCode] as UserRole)
        : ("GUEST" as UserRole);

      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            phoneNumber,
            role,
          },
        },
      });

      if (error) {
        throw new BadRequestException("Failed to register user");
      }

      if (!data || !data.user) {
        throw new BadRequestException("User registration failed");
      }

      const newUser = this.userRepository.create({
        id: data.user.id,
        email,
        username,
        fullName,
        phoneNumber,
        role,
      });

      await this.userRepository.save(newUser);

      return {
        message: "User registered successfully",
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message || "Registration failed");
    }
  }

  async login(getAuthDto: GetAuthDto) {
    try {
      const { identifier, password } = getAuthDto;

      const isExistingUser = await this.userRepository.findOne({
        where: [{ email: identifier }, { username: identifier }],
      });

      if (!isExistingUser) {
        throw new NotFoundException(
          "Account with the provided identifier does not exist",
        );
      }

      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: isExistingUser.email,
        password,
      });

      if (error) {
        throw new BadRequestException("Invalid credentials");
      }

      if (!data || !data.user) {
        throw new BadRequestException("Login failed");
      }

      return {
        message: "User logged in successfully",
        user: data.user,
        accessToken: data.session?.access_token,
        refreshToken: data.session?.refresh_token,
      };
    } catch (error) {
      throw new BadRequestException("Login failed");
    }
  }

  async logout() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) {
        throw new BadRequestException("Logout failed");
      }
      return { message: "User logged out successfully" };
    } catch (error) {
      throw new BadRequestException("Logout failed");
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const { email } = resetPasswordDto;

      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL ?? "localhost:3000"}/reset-password`,
      });

      if (error) {
        throw new BadRequestException("Password reset failed");
      }
      return { message: "Password reset email sent" };
    } catch (error) {
      throw new BadRequestException("Password reset failed");
    }
  }

  async changePassword(userId: string, newPassword: string) {
    try {
      const { error } = await this.supabase.auth.admin.updateUserById(userId, {
        password: newPassword,
      });

      if (error) {
        throw new BadRequestException("Password change failed");
      }
      return { message: "Password changed successfully" };
    } catch (error) {
      throw new BadRequestException("Password change failed");
    }
  }
}
