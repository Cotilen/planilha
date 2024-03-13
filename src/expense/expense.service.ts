import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-expense.dto';
import { UpdateDespesaDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DespesaService {
  constructor(private prisma: PrismaService) {}
  async create(createDespesaDto: CreateDespesaDto) {
    const expense = await this.prisma.tbl_expense.create({
      data: {
        name: createDespesaDto.name,
        description: createDespesaDto.description,
        value: createDespesaDto.value,
        dateExpense:  new Date(createDespesaDto.dateExpense),
        id_user: createDespesaDto.id_user,
        id_category: createDespesaDto.id_category
      }
    })

    return {expense};
  }

  async findAll() {
    const expense = await this.prisma.tbl_expense.findMany();

    return { expense };
  }

  async findOne(id: number) {
    const expense = await this.prisma.tbl_expense.findUnique({
      where:{
        id: Number(id)
      }
    })
  }

  async update(id: number, updateDespesaDto: UpdateDespesaDto) {
    const validationId = await this.prisma.tbl_expense.findUnique({
      where: {
        id: Number(id),
      },
    });

    if(validationId == null){
      throw new NotFoundException('Despesa não encontrada');
    }else{
      const expense = await this.prisma.tbl_expense.update({
        where: {
          id: Number(id),
        },
        data: {
          name: updateDespesaDto.name,
          description: updateDespesaDto.description,
          value: updateDespesaDto.value,
          dateExpense:  new Date(updateDespesaDto.dateExpense),
          id_user: updateDespesaDto.id_user,
          id_category: updateDespesaDto.id_category
        }
      })

       return {expense};
    }
  }

  async remove(id: number) {
    const validationId = await this.prisma.tbl_expense.findUnique({
      where: {
        id: Number(id),
      },
    });

    if(validationId == null){
      throw new NotFoundException('Despesa não encontrada');
    }else{
      const expense = await this.prisma.tbl_expense.delete({
        where: {
          id: Number(id),
        }
      })

      return {
        mensagem: `A despesa com o ID ${id} foi removida com sucesso`
      }
    }
  }
}
