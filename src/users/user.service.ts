/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersGatewaysInterface } from './gateways/users-gateways-interface';
import { User } from './entities/usuario.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersGatewayInterface')
    private gateway: UsersGatewaysInterface
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const user = await this.gateway.create(createUsuarioDto)
    return { user };
  }

  async findAll() {
    const user = await this.gateway.findAll()

    return { user };
  }

  async findOne(id: number) {
    const user = await this.gateway.findOne(id)

    return { user };
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
      const user = await this.gateway.update(id, updateUsuarioDto as User)
      return { user };
    }

  async remove(id: number) {
    
      const user = await this.gateway.remove(id)

      return {
        mensagem: `O usuario com o ID ${id}, foi removido!`,
      } 
  }

  async findDataByDateAndUser(date: number, user: number) {
    const usuario = await this.gateway.findDataBydateAndUser(date,user)


  

    return {
      recipe: usuario.recipe,
      fixedrecipe: usuario.fixedrecipe,
      expense: usuario.expense,
      fixedexpense: usuario.fixedexpense,
      saldo: usuario.saldo,
    };
  }

  async findDataByDate(date: number, user: number){
    const usuario = await this.gateway.findDataByDate(date,user)

      return{
        recipe: usuario.recipe,
        fixedrecipe: usuario.fixedrecipe,
        expense: usuario.expense,
        fixedexpense: usuario.fixedexpense,
      }
      
  }

  async login(email: string, password: string){
    const usuario = await this.gateway.login(email,password)

    return {usuario}
      
  }
}
