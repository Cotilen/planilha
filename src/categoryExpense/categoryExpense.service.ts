import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDespesaDto } from './dto/create-categoryExpense.dto';
import { UpdateCategoriaDespesaDto } from './dto/update-categoryExpense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryExpenseGatewayInterface } from './gateways/categoryExpenseGateway-interface';
import { CategoryExpense } from './entities/categoria-despesa.entity';

@Injectable()
export class CategoriaDespesaService {
  
  constructor(
  @Inject('CategoryExpenseGatewayInterface')
    private gateway: CategoryExpenseGatewayInterface) {}
  async create(createCategoriaDespesaDto: CreateCategoriaDespesaDto) {
    const category = await this.gateway.create(createCategoriaDespesaDto);

    return { category };
  }

  async findAll() {
    const category = await this.gateway.findAll()

    return { category };
  }

  async findOne(id: number) {
    const category = await this.gateway.findOne(id)

    return { category };
  }

  async update(
    id: number,
    updateCategoriaDespesaDto: UpdateCategoriaDespesaDto,
  ) {
      const category = await this.gateway.update(id, updateCategoriaDespesaDto as CategoryExpense)

      return { category };
  }

  async remove(id: number) {
      const category = await this.gateway.remove(id)

      return {
        mensagem: `A categoria com o ID ${id}, foi removida!`
      }
    }
}
