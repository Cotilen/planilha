import { Module } from '@nestjs/common';
import { DespesaService } from './expense.service';
import { DespesaController } from './expense.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExpenseGatewayPrisma } from './gateways/expense-gateway-prisma';

@Module({
  imports:[PrismaModule],
  controllers: [DespesaController],
  providers: [DespesaService, 
    ExpenseGatewayPrisma,
    {
      provide: 'ExpenseGatewayInterface',
      useExisting: ExpenseGatewayPrisma,
    }
  ],
})
export class DespesaModule {}
