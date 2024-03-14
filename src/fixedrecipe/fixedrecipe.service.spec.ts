import { Test, TestingModule } from '@nestjs/testing';
import { FixedrecipeService } from './fixedrecipe.service';

describe('FixedrecipeService', () => {
  let service: FixedrecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixedrecipeService],
    }).compile();

    service = module.get<FixedrecipeService>(FixedrecipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
