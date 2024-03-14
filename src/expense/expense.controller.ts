import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DespesaService } from './expense.service';
import { CreateDespesaDto } from './dto/create-expense.dto';
import { UpdateDespesaDto } from './dto/update-expense.dto';

@Controller('expense')
export class DespesaController {
  constructor(private readonly despesaService: DespesaService) {}

  @Post()
  async create(@Body() createDespesaDto: CreateDespesaDto) {
    return await this.despesaService.create(createDespesaDto);
  }

  @Get()
  async findAll() {
    return await this.despesaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.despesaService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDespesaDto: UpdateDespesaDto) {
    return await this.despesaService.update(+id, updateDespesaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.despesaService.remove(+id);
  }

  @Get('user/:id')
  async findExpenseByUser(@Param('id') id: string) {
    return await this.despesaService.findExpenseByUser(+id);
  }
}
