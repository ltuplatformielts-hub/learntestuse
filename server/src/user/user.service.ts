import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, "supabase")
    private readonly user: Repository<User>,
  ) {}

  async findOne(id: string) {
    const response = await this.user.findOne({ where: { id } });
    return response;
  }
}
