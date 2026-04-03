import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "wp_posts" })
export class WpPost {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  post_title: string;

  @Column()
  post_date: Date;

  @Column()
  post_author: number;

  @Column()
  post_type: string;

  @Column()
  post_status: string;
}
