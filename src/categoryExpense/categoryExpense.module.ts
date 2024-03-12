import { Module } from '@nestjs/common';
import { CategoriaDespesaService } from './categoryExpense.service';
import { CategoriaDespesaController } from './categoryExpense.controller';

@Module({
  controllers: [CategoriaDespesaController],
  providers: [CategoriaDespesaService],
})
export class CategoriaDespesaModule {}
