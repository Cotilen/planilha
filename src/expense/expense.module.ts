import { Module } from '@nestjs/common';
import { DespesaService } from './expense.service';
import { DespesaController } from './expense.controller';

@Module({
  controllers: [DespesaController],
  providers: [DespesaService],
})
export class DespesaModule {}
