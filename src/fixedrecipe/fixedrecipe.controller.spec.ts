import { Test, TestingModule } from '@nestjs/testing';
import { FixedrecipeController } from './fixedrecipe.controller';
import { FixedrecipeService } from './fixedrecipe.service';

describe('FixedrecipeController', () => {
  let controller: FixedrecipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixedrecipeController],
      providers: [FixedrecipeService],
    }).compile();

    controller = module.get<FixedrecipeController>(FixedrecipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
