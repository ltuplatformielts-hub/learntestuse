import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WpPost } from "./entities/wp-post.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class WpPostService {
  constructor(
    @InjectRepository(WpPost, "mysql")
    private readonly repo: Repository<WpPost>,
  ) {}

  async findAll(page: number, limit: number) {
    const query = this.repo
      .createQueryBuilder("c")
      .select([
        "c.ID AS course_id",
        "c.post_title AS course_name",
        "topic.post_title AS module_name",
        "q.ID AS quiz_id",
        "q.post_title AS quiz_name",
        "ques.question_id AS question_id",
        "ques.question_title AS question_title",
        "ques.question_type AS question_type",
        "ans.answer_title AS answer_title",
        "ans.is_correct AS is_correct",
        "img.guid AS course_thumbnail_url",
      ])
      .innerJoin(
        "wp_posts",
        "topic",
        'topic.post_parent = c.ID AND topic.post_type = "topics"',
      )
      .innerJoin(
        "wp_posts",
        "q",
        'q.post_parent = topic.ID AND q.post_type = "tutor_quiz"',
      )
      .innerJoin("wp_tutor_quiz_questions", "ques", "ques.quiz_id = q.ID")
      .leftJoin(
        "wp_tutor_quiz_question_answers",
        "ans",
        "ans.belongs_question_id = ques.question_id",
      )
      .leftJoin(
        "wp_postmeta",
        "pm",
        'pm.post_id = c.ID AND pm.meta_key = "_thumbnail_id"',
      )
      .leftJoin("wp_posts", "img", "img.ID = pm.meta_value")
      .where('c.post_type = "courses"')
      .andWhere('c.post_status = "publish"')
      .orderBy("c.ID", "ASC")
      .offset((page - 1) * limit)
      .limit(limit);

    return await query.getRawMany();
  }
}
