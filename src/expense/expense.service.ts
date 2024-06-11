import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-expense.dto';
import { UpdateDespesaDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { format, utcToZonedTime } from 'date-fns-tz';
import { ExpenseGatewayInterface } from './gateways/expense-gateway-interface';
import { Expense } from './entities/despesa.entity';

@Injectable()
export class DespesaService {
  constructor(
    @Inject('ExpenseGatewayInterface')
    private gateway: ExpenseGatewayInterface,
  ) { }
  async create(createDespesaDto: CreateDespesaDto) {
    const expense = await this.gateway.create(createDespesaDto)

    return { expense };
  }

  async findAll() {
    const expense = await this.gateway.findAll()

    return { expense }
  }

  async findOne(id: number) {
    const expense = await this.gateway.findOne(id)

    return { expense };

  }

  async update(id: number, updateDespesaDto: UpdateDespesaDto) {
    const expense = await this.gateway.update(id, updateDespesaDto as Expense)

    return { expense };
  }

  async remove(id: number) {
    const remove = await this.gateway.remove(id)

    return {
      mensagem: `A despesa com o ID ${id} foi removida com sucesso`
    }
  }

  async findExpenseByUser(id: number) {
    const expense = await this.gateway.findExpenseByUser(id)
    return { expense };
  }
}
