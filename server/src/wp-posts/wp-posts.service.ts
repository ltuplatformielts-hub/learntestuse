import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WpPost } from "./entities/wp-post.entity.js";

@Injectable()
export class WpPostsService {
  constructor(
    @InjectRepository(WpPost, "mysql")
    private readonly wpPostsRepository: Repository<WpPost>,
  ) {}

  async findAll(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;

      const queryBuilder = this.wpPostsRepository
        .createQueryBuilder("p")
        .leftJoin("wp_users", "u", "p.post_author = u.ID")
        .where("p.post_type = :type", { type: "tutor_quiz" })
        .andWhere("p.post_status = :status", { status: "publish" });

      const data = await queryBuilder
        .select([
          "p.ID AS id",
          "p.post_title AS title",
          "u.display_name AS author",
          "p.post_date AS createdAt",
          // "p.post_content AS content", // Mở ra nếu bạn muốn lấy luôn nội dung đề
        ])
        .orderBy("p.post_date", "DESC")
        .offset(skip)
        .limit(limit)
        .getRawMany();

      const total = await queryBuilder.getCount();
      const totalPages = Math.ceil(total / limit);
      return {
        message:
          data.length > 0 ? "Posts fetched successfully" : "No posts found",
        data,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      // ... giữ nguyên logic log error của bạn
      throw new InternalServerErrorException(
        "Failed to fetch WordPress posts.",
      );
    }
  }
}
