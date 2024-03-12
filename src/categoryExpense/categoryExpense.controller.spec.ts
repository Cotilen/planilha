import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaDespesaController } from './categoryExpense.controller';
import { CategoriaDespesaService } from './categoryExpense.service';

describe('CategoriaDespesaController', () => {
  let controller: CategoriaDespesaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaDespesaController],
      providers: [CategoriaDespesaService],
    }).compile();

    controller = module.get<CategoriaDespesaController>(CategoriaDespesaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
