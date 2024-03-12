import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaDespesaService } from './categoryExpense.service';

describe('CategoriaDespesaService', () => {
  let service: CategoriaDespesaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaDespesaService],
    }).compile();

    service = module.get<CategoriaDespesaService>(CategoriaDespesaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
