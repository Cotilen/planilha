import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FixedexpenseService } from './fixedexpense.service';
import { CreateFixedexpenseDto } from './dto/create-fixedexpense.dto';
import { UpdateFixedexpenseDto } from './dto/update-fixedexpense.dto';

@Controller('fixedexpense')
export class FixedexpenseController {
  constructor(private readonly fixedexpenseService: FixedexpenseService) {}

  @Post()
  async create(@Body() createFixedexpenseDto: CreateFixedexpenseDto) {
    return await this.fixedexpenseService.create(createFixedexpenseDto);
  }

  @Get()
  async findAll() {
    return await this.fixedexpenseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.fixedexpenseService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFixedexpenseDto: UpdateFixedexpenseDto) {
    return await  this.fixedexpenseService.update(+id, updateFixedexpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await  this.fixedexpenseService.remove(+id);
  }

  @Get('user/:id')
  async findExpenseByUser(@Param('id') id: string) {
    return await this.fixedexpenseService.findExpenseByUser(+id);
  }
}
