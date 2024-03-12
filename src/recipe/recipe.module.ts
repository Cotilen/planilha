import { Module } from '@nestjs/common';
import { ReceitaService } from './recipe.service';
import { ReceitaController } from './recipe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[PrismaModule],
  controllers: [ReceitaController],
  providers: [ReceitaService, PrismaService],
})
export class ReceitaModule {}
