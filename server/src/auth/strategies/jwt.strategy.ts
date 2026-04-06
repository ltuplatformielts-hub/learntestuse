import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service.js";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromHeader: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SUPABASE_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // payload.sub chính là UUID của user bên Supabase Auth
    const user = await this.userService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    // Trả về object này để dùng trong @Req() req.user
    return {
      id: user.id,
      email: user.email,
      role: user.role, // INDIVIDUAL, TEAM, ENTERPRISE, EDUCATION
    };
  }
}
