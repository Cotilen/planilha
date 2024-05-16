import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFixedexpenseDto } from './dto/create-fixedexpense.dto';
import { UpdateFixedexpenseDto } from './dto/update-fixedexpense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinalDateDto } from 'src/fixedrecipe/dto/create-fixedrecipe.dto';

@Injectable()
export class FixedexpenseService {
  constructor(private prisma: PrismaService){}
  async create(createFixedexpenseDto: CreateFixedexpenseDto) {
    const expense = await this.prisma.tbl_fixedExpense.create({
      data: {
        name: createFixedexpenseDto.name,
        description: createFixedexpenseDto.description,
        value: createFixedexpenseDto.value,
        id_user: createFixedexpenseDto.id_user,
        id_category: createFixedexpenseDto.id_category,
        dateExpense:  new Date(createFixedexpenseDto.dateExpense)
      }
    })

    return {expense};
  }

  async findAll() {
    const expense = await this.prisma.tbl_fixedExpense.findMany();

    return {expense}
  }

  async findOne(id: number) {
    const expense = await this.prisma.tbl_fixedExpense.findUnique({
      where:{
        id: Number(id)
      }
    })

    if(expense == null){
      throw new NotFoundException('Receita não encontrada');
    }else{
      return {expense};
    }
    
  }

  async update(id: number, updateFixedexpenseDto: UpdateFixedexpenseDto) {
    const validationId = await this.prisma.tbl_fixedExpense.findUnique({
      where: {
        id: Number(id),
      },
    });

    if(validationId == null){
      throw new NotFoundException('Despesa não encontrada');
    }else{
      const expense = await this.prisma.tbl_fixedExpense.update({
        where: {
          id: Number(id),
        },
        data: {
          name: updateFixedexpenseDto.name,
          description: updateFixedexpenseDto.description,
          value: updateFixedexpenseDto.value,
          id_category: updateFixedexpenseDto.id_category,
          dateExpense:  new Date(updateFixedexpenseDto.dateExpense)
        }
      })

       return {expense};
    }
  }

  async remove(id: number) {
    const validationId = await this.prisma.tbl_fixedExpense.findUnique({
      where: {
        id: Number(id),
      },
    });

    if(validationId == null){
      throw new NotFoundException('Despesa não encontrada');
    }else{
      const expense = await this.prisma.tbl_fixedExpense.delete({
        where: {
          id: Number(id),
        }
      })

      return {
        mensagem: `A despesa com o ID ${id} foi removida com sucesso`
      }
    }
  }

  async findExpenseByUser(id: number) {
    const validationId = await this.prisma.tbl_users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationId == null) {
      throw new NotFoundException('Usuário não encontrado');
    } else {
      const expense = await this.prisma.tbl_fixedExpense.findMany({
        where: {
          id_user: Number(id),
        },
      });

      return { expense };
    }
  }

  async updateFinalDate(id: number, updateFixedexpenseDto: FinalDateDto) {
    const validationId = await this.prisma.tbl_fixedExpense.findUnique({
      where: {
        id: Number(id),
      },
    });

    if(validationId == null){
      throw new NotFoundException('Despesa não encontrada');
    }else{
      const expense = await this.prisma.tbl_fixedExpense.update({
        where: {
          id: Number(id),
        },
        data: {
          finalDate: updateFixedexpenseDto.finalDate
        }
      })

       return {expense};
    }
  }
}
