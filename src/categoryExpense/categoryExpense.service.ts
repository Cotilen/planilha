import { Injectable } from '@nestjs/common';
import { CreateCategoriaDespesaDto } from './dto/create-categoryExpense.dto';
import { UpdateCategoriaDespesaDto } from './dto/update-categoryExpense.dto';

@Injectable()
export class CategoriaDespesaService {
  create(createCategoriaDespesaDto: CreateCategoriaDespesaDto) {
    return 'This action adds a new categoriaDespesa';
  }

  findAll() {
    return `This action returns all categoriaDespesa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriaDespesa`;
  }

  update(id: number, updateCategoriaDespesaDto: UpdateCategoriaDespesaDto) {
    return `This action updates a #${id} categoriaDespesa`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriaDespesa`;
  }
}
