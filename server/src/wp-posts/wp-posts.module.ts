import { Module } from '@nestjs/common';
import { WpPostsService } from './wp-posts.service';
import { WpPostsController } from './wp-posts.controller';

@Module({
  controllers: [WpPostsController],
  providers: [WpPostsService],
})
export class WpPostsModule {}
