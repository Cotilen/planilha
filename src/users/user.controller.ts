/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService as UsersService } from './user.service';
import { CreateUsuarioDto, FindLoginDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usersService.create(createUsuarioDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return await this.usersService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }

  @Get(':user/data/:date')
  async findDataByDateAndUser(
    @Param('user') user: number,
    @Param('date') date: number,
  ) {
    return await this.usersService.findDataByDateAndUser(date, user);
  }

  @Post('/login')
  async login(@Body() findLoginDto:FindLoginDto) {
    return await this.usersService.login(findLoginDto.email, findLoginDto.password);
  }
}
