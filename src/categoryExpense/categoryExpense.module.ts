import { Module } from '@nestjs/common';
import { CategoriaDespesaService } from './categoryExpense.service';
import { CategoriaDespesaController } from './categoryExpense.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryExpenseGatewayPrisma } from './gateways/categoryExpenseGateway-prisma';

@Module({
  imports:[PrismaModule],
  controllers: [CategoriaDespesaController],
  providers: [CategoriaDespesaService,
    CategoryExpenseGatewayPrisma,
    {
      provide: 'CategoryExpenseGatewayInterface',
      useExisting: CategoryExpenseGatewayPrisma,
    }
  ],
})
export class CategoriaDespesaModule {}
