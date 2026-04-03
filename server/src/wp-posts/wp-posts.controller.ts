import { Controller, Get, Query } from "@nestjs/common";
import { WpPostsService } from "./wp-posts.service.js";

@Controller("wp-posts")
export class WpPostsController {
  constructor(private readonly wpPostsService: WpPostsService) {}

  @Get()
  async findAll(
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "12",
  ) {
    return await this.wpPostsService.findAll(Number(page), Number(limit));
  }
}
