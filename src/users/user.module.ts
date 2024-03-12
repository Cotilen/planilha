import { Module } from '@nestjs/common';
import { UsuarioService } from './user.service';
import { UsuarioController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[PrismaModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService],
})
export class UsuarioModule {}
