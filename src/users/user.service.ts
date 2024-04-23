/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const user = await this.prisma.tbl_users.create({
      data: {
        name: createUsuarioDto.name,
        email: createUsuarioDto.email,
        password: createUsuarioDto.password,
      },
    });

    return { user };
  }

  async findAll() {
    const user = await this.prisma.tbl_users.findMany();

    return { user };
  }

  async findOne(id: number) {
    const user = await this.prisma.tbl_users.findUnique({
      where: {
        id: id,
      },
    });

    return { user };
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const validationId = await this.prisma.tbl_users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationId == null) {
      throw new NotFoundException('Usuario não encontrada');
    } else {
      const user = await this.prisma.tbl_users.update({
        data: {
          name: updateUsuarioDto.name,
          email: updateUsuarioDto.email,
          password: updateUsuarioDto.password,
        },
        where: {
          id: Number(id),
        },
      });

      return { user };
    }
  }

  async remove(id: number) {
    const validationId = await this.prisma.tbl_users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationId == null) {
      throw new NotFoundException('Usuario não encontrada');
    } else {
      const user = await this.prisma.tbl_users.delete({
        where: {
          id: Number(id),
        },
      });

      return {
        mensagem: `O usuario com o ID ${id}, foi removido!`,
      };
    }
  }

  async findDataByDateAndUser(date: number, user: number) {
    // eslint-disable-next-line no-var
    var saldo: number = 0;

    const recipe: {
      id: number;
      name: string;
      value: number;
      date: string;
    }[] = await this.prisma
      .$queryRaw`select id, name, value, daterecipe as data 
    from tbl_recipe where month(daterecipe) = ${date} and id_user = ${user}`;

    const fixedRecipe: {
      id: number;
      name: string;
      value: number;
      dateRecipe: string
    }[] = await this.prisma
      .$queryRaw`select id, name, value,dateRecipe  from tbl_fixedrecipe where id_user = ${user};`;

    const expense: {
      id: number;
      name: string;
      value: number;
      data: string;
      category: number;
    }[] = await this.prisma
      .$queryRaw`select id, name, value, dateexpense as data, id_category as category 
    from tbl_expense where month(dateexpense) = ${date} and id_user = ${user};`;

    const fixedExpense: {
      id: number;
      name: string;
      value: number;
      category: number;
      dateExpense: string
    }[] = await this.prisma
      .$queryRaw`select id, name, value, id_category as category, dateExpense from tbl_fixedexpense where id_user = ${user};`;

    recipe.map((element) => {
      saldo = saldo + element.value;
    });

    fixedRecipe.map((element) => {
      saldo = saldo + element.value;
    });

    fixedExpense.map((element) => {
      saldo = saldo - element.value;
    });

    expense.map((element) => {
      saldo = saldo - element.value;
    });

    return {
      recipe: recipe,
      fixedrecipe: fixedRecipe,
      expense: expense,
      fixedexpense: fixedExpense,
      saldo: saldo,
    };
  }

  async findDataByDate(date: number, user: number){
    const recipe: {
      id: number;
      name: string;
      value: number;
      date: string;
    }[] = await this.prisma
      .$queryRaw`select id, name, value, dateRecipe as data 
    from tbl_recipe where year(daterecipe) = ${date} and id_user = ${user}`;

    const fixedRecipe: {
      id: number;
      name: string;
      value: number;
      dateRecipe: string
    }[] = await this.prisma
      .$queryRaw`select id, name, value, dateRecipe from tbl_fixedrecipe where id_user = ${user};`;

    const expense: {
      id: number;
      name: string;
      value: number;
      data: string;
      category: number;
    }[] = await this.prisma
      .$queryRaw`select id, name, value,dateexpense as data, id_category as category 
    from tbl_expense where year(dateexpense) = ${date} and id_user = ${user};`;

    const fixedExpense: {
      id: number;
      name: string;
      value: number;
      category: number;
      dateExpense: string
    }[] = await this.prisma
      .$queryRaw`select id, name, value,dateExpense, id_category as category from tbl_fixedexpense where id_user = ${user};`;

      

      return{
        recipe: recipe,
        fixedrecipe: fixedRecipe,
        expense: expense,
        fixedexpense: fixedExpense,
      }
      
  }

  async login(email: string, password: string){
    const user = await this.prisma.tbl_users.findFirst({
      where: {
        email: email,
        password: password
      },
    });
    if(user)
      return { user };
    else{
      throw new NotFoundException('Usuario não encontrada');
    }
      
  }
}
