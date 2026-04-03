import { Column, Entity } from "typeorm";

@Entity("wp_term_relationships")
export class WpTermRelationship {
  @Column({ primary: true })
  object_id: number;

  @Column({ primary: true })
  term_taxonomy_id: number;

  @Column({ nullable: true })
  term_order: number;
}
