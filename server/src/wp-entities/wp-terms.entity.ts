import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "wp_terms" })
export class WpTerm {
  @PrimaryGeneratedColumn()
  term_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  term_group: number;
}
