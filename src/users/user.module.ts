import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersGatewayPrisma } from './gateways/users-gateways-prisma';

@Module({
  imports:[PrismaModule],
  controllers: [UsersController],
  providers: [UsersService,
    UsersGatewayPrisma,
    {
      provide: 'UsersGatewayInterface',
      useExisting: UsersGatewayPrisma,
    }],
})
export class UsuarioModule {}
