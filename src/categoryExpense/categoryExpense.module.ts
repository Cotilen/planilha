import { Module } from '@nestjs/common';
import { CategoriaDespesaService } from './categoryExpense.service';
import { CategoriaDespesaController } from './categoryExpense.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[PrismaModule],
  controllers: [CategoriaDespesaController],
  providers: [CategoriaDespesaService,PrismaService],
})
export class CategoriaDespesaModule {}
