import { Controller, Get, Param } from "@nestjs/common";
import { WpPostService } from "./wp-post.service.js";

@Controller("wp-post")
export class WpPostController {
  constructor(private readonly wpPostService: WpPostService) {}

  @Get()
  async findAll(@Param("page") page: number, @Param("limit") limit: number) {
    return await this.wpPostService.findAll(page, limit);
  }
}
