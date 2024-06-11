import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFixedexpenseDto } from './dto/create-fixedexpense.dto';
import { UpdateFixedexpenseDto } from './dto/update-fixedexpense.dto';
import { FixedExpenseGatewayInterface } from './gateways/fixedexpense-gateway-interface';
import { Fixedexpense } from './entities/fixedexpense.entity';

@Injectable()
export class FixedexpenseService {
  constructor(
    @Inject('FixedExpenseGatewayInterface')
    private gatewayService: FixedExpenseGatewayInterface
  ) { }
  async create(body: CreateFixedexpenseDto) {

    const gateway = await this.gatewayService.create(body)

    return {
      expense: gateway
    };
  }

  async findAll() {
    const expense = await this.gatewayService.findAll()

    return { expense }
  }

  async findOne(id: number) {
    const expense = await this.gatewayService.findOne(id)

    return { expense };
  }

  async update(id: number, updateFixedexpenseDto: UpdateFixedexpenseDto) {

    const expense = await this.gatewayService.update(id, updateFixedexpenseDto as Fixedexpense)

    return { expense };
  }

  async remove(id: number) {

    const expense = await this.gatewayService.remove(id)

    return {
      mensagem: `A despesa com o ID ${id} foi removida com sucesso`
    }
  }

  async findExpenseByUser(id: number) {

    const expense = await this.gatewayService.findExpenseByUser(id)

    return { expense };

  }
}
