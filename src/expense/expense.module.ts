import { Module } from '@nestjs/common';
import { DespesaService } from './expense.service';
import { DespesaController } from './expense.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[PrismaModule],
  controllers: [DespesaController],
  providers: [DespesaService, PrismaService],
})
export class DespesaModule {}
