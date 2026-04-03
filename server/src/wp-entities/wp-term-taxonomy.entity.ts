import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("wp_term_taxonomy")
export class WpTermTaxonomy {
  @PrimaryGeneratedColumn()
  term_taxonomy_id: number;

  @Column()
  term_id: number;

  @Column()
  taxonomy: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  parent: number;

  @Column()
  count: number;
}
