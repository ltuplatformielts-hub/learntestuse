// wp-post.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("wp_posts")
export class WpPost {
  @PrimaryGeneratedColumn({ name: "ID" })
  id: number;

  @Column({ name: "post_title" })
  title: string;

  @Column({ name: "post_type" })
  type: string;

  @Column({ name: "post_status" })
  status: string;

  @Column({ name: "post_parent" })
  parentId: number;

  @Column({ name: "menu_order" })
  menuOrder: number;

  @Column({ name: "guid" })
  guid: string;
}
