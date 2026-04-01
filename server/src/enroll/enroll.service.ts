import { Injectable } from "@nestjs/common";
import { CreateEnrollDto } from "./dto/create-enroll.dto.js";
import { UpdateEnrollDto } from "./dto/update-enroll.dto.js";

@Injectable()
export class EnrollService {
  create(createEnrollDto: CreateEnrollDto) {
    return "This action adds a new enroll";
  }

  findAll() {
    return `This action returns all enroll`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enroll`;
  }

  update(id: number, updateEnrollDto: UpdateEnrollDto) {
    return `This action updates a #${id} enroll`;
  }

  remove(id: number) {
    return `This action removes a #${id} enroll`;
  }
}
