import { Enroll } from "../../enroll/entities/enroll.entity.js";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  GUEST = "GUEST",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Index()
  @Column({ type: "varchar", nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Index()
  @Column({ nullable: false })
  fullName: string;

  @Index()
  @Column({ type: "int", default: 0 })
  level: number;

  @Index()
  @Column({ type: "varchar", nullable: true })
  className?: string;

  @Index()
  @Column({ type: "float", default: 0 })
  bandScore: number;

  @OneToMany(() => Enroll, (enroll) => enroll.user)
  enrolls: Enroll[];

  @Column({ type: "varchar", nullable: true })
  avatarUrl?: string;

  @Index()
  @Column({ type: "enum", enum: UserRole, default: UserRole.GUEST })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
