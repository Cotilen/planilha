import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FixedrecipeService } from './fixedrecipe.service';
import { CreateFixedrecipeDto, FinalDateDto } from './dto/create-fixedrecipe.dto';
import { UpdateFixedrecipeDto } from './dto/update-fixedrecipe.dto';

@Controller('fixedrecipe')
export class FixedrecipeController {
  constructor(private readonly fixedrecipeService: FixedrecipeService) {}

  @Post()
  async create(@Body() createFixedrecipeDto: CreateFixedrecipeDto) {
    return await this.fixedrecipeService.create(createFixedrecipeDto);
  }

  @Get()
  async findAll() {
    return await this.fixedrecipeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await  this.fixedrecipeService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFixedrecipeDto: UpdateFixedrecipeDto) {
    return await this.fixedrecipeService.update(+id, updateFixedrecipeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.fixedrecipeService.remove(+id);
  }

  @Get('user/:id')
  async findRecipeByUser(@Param('id') id: string) {
    return await this.fixedrecipeService.findRecipeByUser(+id);
  }

  @Patch('data/:id')
  async updateFinalDate(@Param('id') id: string, @Body() updateFixedrecipeDto: FinalDateDto) {
    return await this.fixedrecipeService.updateFinalDate(+id, updateFixedrecipeDto);
  }
}
