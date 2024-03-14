import { Test, TestingModule } from '@nestjs/testing';
import { FixedexpenseController } from './fixedexpense.controller';
import { FixedexpenseService } from './fixedexpense.service';

describe('FixedexpenseController', () => {
  let controller: FixedexpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixedexpenseController],
      providers: [FixedexpenseService],
    }).compile();

    controller = module.get<FixedexpenseController>(FixedexpenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
