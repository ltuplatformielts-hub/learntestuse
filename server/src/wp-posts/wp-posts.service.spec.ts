import { Test, TestingModule } from '@nestjs/testing';
import { WpPostsService } from './wp-posts.service';

describe('WpPostsService', () => {
  let service: WpPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WpPostsService],
    }).compile();

    service = module.get<WpPostsService>(WpPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
