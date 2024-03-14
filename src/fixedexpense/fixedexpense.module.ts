import { Module } from '@nestjs/common';
import { FixedexpenseService } from './fixedexpense.service';
import { FixedexpenseController } from './fixedexpense.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[PrismaModule],
  controllers: [FixedexpenseController],
  providers: [FixedexpenseService, PrismaService],
})
export class FixedexpenseModule {}
