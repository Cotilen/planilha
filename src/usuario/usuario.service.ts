import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.prisma.usuario.create({
      data: {
        nome: createUsuarioDto.nome,
        email: createUsuarioDto.email,
        senha: createUsuarioDto.senha,
      },
    });

    return { usuario };
  }

  async findAll() {
    const usuario = await this.prisma.usuario.findMany();

    return { usuario };
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id: id,
      },
    });

    return { usuario };
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const validacaoId = await this.prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validacaoId == null) {
      throw new NotFoundException('Usuario não encontrada');
    } else {
      const usuario = await this.prisma.usuario.update({
        data: {
          nome: updateUsuarioDto.nome,
          email: updateUsuarioDto.email,
          senha: updateUsuarioDto.senha,
        },
        where: {
          id: Number(id),
        },
      });

      return{usuario}
    }
  }

  async remove(id: number) {
    const validacaoId = await this.prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validacaoId == null) {
      throw new NotFoundException('Usuario não encontrada');
    } else {
      const usuario = await this.prisma.usuario.delete({
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
