import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const user = await this.prisma.tbl_users.create({
      data: {
        name: createUsuarioDto.name,
        email: createUsuarioDto.email,
        password: createUsuarioDto.password,
      },
    });

    return { user };
  }

  async findAll() {
    const user = await this.prisma.tbl_users.findMany();

    return { user };
  }

  async findOne(id: number) {
    const user = await this.prisma.tbl_users.findUnique({
      where: {
        id: id,
      },
    });

    return { user };
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const validationId = await this.prisma.tbl_users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationId == null) {
      throw new NotFoundException('Usuario não encontrada');
    } else {
      const user = await this.prisma.tbl_users.update({
        data: {
          name: updateUsuarioDto.name,
          email: updateUsuarioDto.email,
          password: updateUsuarioDto.password,
        },
        where: {
          id: Number(id),
        },
      });

      return{user}
    }
  }

  async remove(id: number) {
    const validationId = await this.prisma.tbl_users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationId == null) {
      throw new NotFoundException('Usuario não encontrada');
    } else {
      const user = await this.prisma.tbl_users.delete({
        where:{
          id: Number(id)
        }
      })

      return {
        mensagem: `O usuario com o ID ${id}, foi removido!`
      };
    }
  }
}
