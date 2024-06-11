import { Module } from '@nestjs/common';
import { FixedexpenseService } from './fixedexpense.service';
import { FixedexpenseController } from './fixedexpense.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { FixedExpenseGatewayPrisma } from './gateways/fixedexpense-gateway-prisma';

@Module({
  imports:[PrismaModule],
  controllers: [FixedexpenseController],
  providers: [FixedexpenseService,
      FixedExpenseGatewayPrisma,
    {
      provide: 'FixedExpenseGatewayInterface',
      useExisting: FixedExpenseGatewayPrisma,
    }

  ],
})
export class FixedexpenseModule {}
