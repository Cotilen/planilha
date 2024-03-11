import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) {}

  @Post()
  async create(@Body() createReceitaDto: CreateReceitaDto) {
    return await this.receitaService.create(createReceitaDto);
  }

  @Get()
  async findAll() {
    return await this.receitaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.receitaService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReceitaDto: UpdateDespesaDto) {
    return await this.receitaService.update(+id, updateReceitaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.receitaService.remove(+id);
  }

  @Get('usuario/:id')
  async findReceitaByUsuario(@Param('id') id: string) {
    return await this.receitaService.findReceitaByUsuario(+id);
  }
}
