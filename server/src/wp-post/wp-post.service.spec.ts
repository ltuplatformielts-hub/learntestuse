import { Test, TestingModule } from "@nestjs/testing";
import { WpPostService } from "./wp-post.service.js";

describe("WpPostService", () => {
  let service: WpPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WpPostService],
    }).compile();

    service = module.get<WpPostService>(WpPostService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
