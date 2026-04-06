import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("wp_tutor_quiz_question_answers")
export class TutorAnswer {
  @PrimaryGeneratedColumn({ name: "answer_id" })
  id: number;

  @Column({ name: "belongs_question_id" })
  questionId: number;

  @Column({ name: "answer_title", type: "text" })
  title: string;

  @Column({ name: "is_correct", type: "int" })
  isCorrect: number; // 0 hoặc 1

  @Column({ name: "answer_order", type: "int" })
  order: number;

  // Quan hệ ngược lại với Question
  // Dùng arrow function () => TutorQuestion để tránh lỗi Circular Dependency
  @ManyToOne("TutorQuestion", "answers")
  @JoinColumn({ name: "belongs_question_id" })
  question: any;
}
