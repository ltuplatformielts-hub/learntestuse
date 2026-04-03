import { Module } from "@nestjs/common";
import { WpPostsService } from "./wp-posts.service.js";
import { WpPostsController } from "./wp-posts.controller.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WpPost } from "./entities/wp-post.entity.js";
import { WpTerm } from "../wp-entities/wp-terms.entity.js";
import { WpTermTaxonomy } from "../wp-entities/wp-term-taxonomy.entity.js";
import { WpTermRelationship } from "../wp-entities/wp-term-relationships.entity.js";

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [WpPost, WpTerm, WpTermTaxonomy, WpTermRelationship],
      "mysql",
    ),
  ],
  controllers: [WpPostsController],
  providers: [WpPostsService],
})
export class WpPostsModule {}
