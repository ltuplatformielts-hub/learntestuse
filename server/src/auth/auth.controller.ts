import { Controller, Post, Body, Res, Param } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { CreateAuthDto } from "./dto/create-auth.dto.js";
import { GetAuthDto } from "./dto/get-auth.dto.js";
import type { Response } from "express";
import { ChangePasswordDto, ResetPasswordDto } from "./dto/update-auth.dto.js";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.register(createAuthDto);
  }

  @Post("login")
  async login(
    @Body() getAuthDto: GetAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, message, user } =
      await this.authService.login(getAuthDto);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { message, user };
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    const result = await this.authService.logout();

    return { message: result };
  }

  @Post("reset-password")
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Post(":id/change-password")
  async changePassword(
    @Param("id") userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(
      userId,
      changePasswordDto.newPassword,
    );
  }
}
