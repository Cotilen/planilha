import { Test, TestingModule } from '@nestjs/testing';
import { FixedexpenseService } from './fixedexpense.service';

describe('FixedexpenseService', () => {
  let service: FixedexpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixedexpenseService],
    }).compile();

    service = module.get<FixedexpenseService>(FixedexpenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
