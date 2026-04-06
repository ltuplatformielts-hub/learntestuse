import { Test, TestingModule } from "@nestjs/testing";
import { WpPostController } from "./wp-post.controller.js";
import { WpPostService } from "./wp-post.service.js";

describe("WpPostController", () => {
  let controller: WpPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WpPostController],
      providers: [WpPostService],
    }).compile();

    controller = module.get<WpPostController>(WpPostController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
