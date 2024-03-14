import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDespesaDto } from './dto/create-categoryExpense.dto';
import { UpdateCategoriaDespesaDto } from './dto/update-categoryExpense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriaDespesaService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoriaDespesaDto: CreateCategoriaDespesaDto) {
    const category = await this.prisma.tbl_categoryExpense.create({
      data: {
        name: createCategoriaDespesaDto.name,
      },
    });

    return { category };
  }

  async findAll() {
    const category = await this.prisma.tbl_categoryExpense.findMany();

    return { category };
  }

  async findOne(id: number) {
    const category = await this.prisma.tbl_categoryExpense.findUnique({
      where: {
        id: id,
      },
    });

    return { category };
  }

  async update(
    id: number,
    updateCategoriaDespesaDto: UpdateCategoriaDespesaDto,
  ) {
    const validationId = await this.prisma.tbl_categoryExpense.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationId == null) {
      throw new NotFoundException('Categoria de despesa não encontrada');
    } else {
      const category = await this.prisma.tbl_categoryExpense.update({
        where: {
          id: Number(id),
        },
        data: {
          name: updateCategoriaDespesaDto.name,
        },
      });

      return { category };
    }
  }

  async remove(id: number) {
    const validationId = await this.prisma.tbl_categoryExpense.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationId == null) {
      throw new NotFoundException('Categoria de despesa não encontrada');
    } else {
      const category = await this.prisma.tbl_categoryExpense.delete({
        where: {
          id: Number(id),
        },
      });

      return {
        mensagem: `A categoria com o ID ${id}, foi removida!`
      };
    }
  }
}
