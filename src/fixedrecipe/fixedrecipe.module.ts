import { Module } from '@nestjs/common';
import { FixedrecipeService } from './fixedrecipe.service';
import { FixedrecipeController } from './fixedrecipe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[PrismaModule],
  controllers: [FixedrecipeController],
  providers: [FixedrecipeService, PrismaService],
})
export class FixedrecipeModule {}
