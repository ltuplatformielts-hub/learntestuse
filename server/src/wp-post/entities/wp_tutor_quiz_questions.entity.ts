import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("wp_tutor_quiz_questions")
export class TutorQuestion {
  @PrimaryGeneratedColumn({ name: "question_id" })
  id: number;

  @Column()
  quiz_id: number;

  @Column()
  question_title: string;

  @Column()
  question_type: string;

  @OneToMany("TutorAnswer", "question")
  answers: any[];
}
