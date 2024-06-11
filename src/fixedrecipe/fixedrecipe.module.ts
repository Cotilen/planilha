import { FixedRecipeGatewayInterface } from './gateways/fixedrecipe-gateway-interface';
import { Module } from '@nestjs/common';
import { FixedrecipeService } from './fixedrecipe.service';
import { FixedrecipeController } from './fixedrecipe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { FixedRecipeGatewayPrisma } from './gateways/fixedrecipe-gateway-prisma';

@Module({
  imports:[PrismaModule],
  controllers: [FixedrecipeController],
  providers: [FixedrecipeService,
    FixedRecipeGatewayPrisma,
    {
      provide: 'FixedRecipeGatewayInterface',
      useExisting: FixedRecipeGatewayPrisma,
    }

  ],
})
export class FixedrecipeModule {}
