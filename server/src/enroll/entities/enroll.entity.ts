import { User } from "../../user/entities/user.entity.js";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum EnrollStatus {
  INPROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

@Index(["userId", "examId"])
@Entity({ name: "enrolls" })
export class Enroll {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ type: "uuid", nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Index()
  @Column({ type: "varchar", nullable: false })
  examId: string;

  @Column({ type: "varchar", nullable: true })
  ipAddress: string;

  @Index()
  @Column({
    type: "enum",
    enum: EnrollStatus,
    default: EnrollStatus.INPROGRESS,
  })
  status: EnrollStatus;

  @Column({ type: "jsonb", select: false })
  examSnapshot: any;

  @Column({ type: "timestamptz", nullable: true })
  startAt: Date;

  @Column({ type: "int", default: 0 })
  duration: number;

  @Column({ type: "int", default: 0 })
  timeLimit: number;

  @Column({ type: "int", default: 0 })
  violateCount: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;
}
