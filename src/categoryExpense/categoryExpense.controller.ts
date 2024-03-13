import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaDespesaService } from './categoryExpense.service';
import { CreateCategoriaDespesaDto } from './dto/create-categoryExpense.dto';
import { UpdateCategoriaDespesaDto } from './dto/update-categoryExpense.dto';

@Controller('category')
export class CategoriaDespesaController {
  constructor(private readonly categoriaDespesaService: CategoriaDespesaService) {}

  @Post()
  async create(@Body() createCategoriaDespesaDto: CreateCategoriaDespesaDto) {
    return await this.categoriaDespesaService.create(createCategoriaDespesaDto);
  }

  @Get()
  async findAll() {
    return await this.categoriaDespesaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoriaDespesaService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoriaDespesaDto: UpdateCategoriaDespesaDto) {
    return await this.categoriaDespesaService.update(+id, updateCategoriaDespesaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoriaDespesaService.remove(+id);
  }
}
