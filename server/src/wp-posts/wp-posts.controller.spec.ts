import { Test, TestingModule } from '@nestjs/testing';
import { WpPostsController } from './wp-posts.controller';
import { WpPostsService } from './wp-posts.service';

describe('WpPostsController', () => {
  let controller: WpPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WpPostsController],
      providers: [WpPostsService],
    }).compile();

    controller = module.get<WpPostsController>(WpPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
