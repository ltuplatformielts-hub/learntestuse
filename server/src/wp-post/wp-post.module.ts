import { Module } from "@nestjs/common";
import { WpPostService } from "./wp-post.service.js";
import { WpPostController } from "./wp-post.controller.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WpPost } from "./entities/wp-post.entity.js";
import { TutorQuestion } from "./entities/wp_tutor_quiz_questions.entity.js";
import { TutorAnswer } from "./entities/wp_tutor_quiz_question_answers.entity.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([WpPost, TutorQuestion, TutorAnswer], "mysql"),
  ],
  controllers: [WpPostController],
  providers: [WpPostService],
})
export class WpPostModule {}
