import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersGatewaysInterface } from "./users-gateways-interface";
import { User } from "../entities/usuario.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { Receita } from "src/recipe/entities/receita.entity";
import { Fixedrecipe } from "src/fixedrecipe/entities/fixedrecipe.entity";
import { Expense } from "src/expense/entities/despesa.entity";
import { Fixedexpense } from "src/fixedexpense/entities/fixedexpense.entity";
import { Login } from "../entities/login.entity";

@Injectable()
export class UsersGatewayPrisma implements UsersGatewaysInterface{

    constructor(
        private prisma: PrismaService,
    ) { }
    async create(user: User): Promise<User>{
        const usuario = await this.prisma.tbl_users.create({
            data: {
              name: user.name,
              email: user.email,
              password: user.password,
            },
          });

        return usuario
    }

    async findAll(): Promise<User[]>{
        const usuarios = await this.prisma.tbl_users.findMany();
        return usuarios;
    }

    async findOne(id: number): Promise<User>{
        const user = await this.prisma.tbl_users.findUnique({
            where: {
              id: id,
            },
          });

        return user
    }

    async update(id: number, user: User): Promise<User>{
        const usuario = await this.prisma.tbl_users.update({
            data: {
              name: user.name,
              email: user.email,
              password: user.password,
            },
            where: {
              id: Number(id),
            },
          });

          return usuario
    }

    async remove(id: number){
        const user = await this.prisma.tbl_users.delete({
            where: {
              id: Number(id),
            },
          });

          return user
    }
    async findDataBydateAndUser(date: number, user: number): Promise<{ recipe: Receita[], fixedrecipe: Fixedrecipe[], expense: Expense[], fixedexpense: Fixedexpense[], saldo: number }> {
        let saldo: number = 0;
    
        const recipe: Receita[] = await this.prisma.$queryRaw`
          select id, name, value, daterecipe as data, id_user 
          from tbl_recipe 
          where month(daterecipe) = ${date} and id_user = ${user}`;
    
        const fixedRecipe: Fixedrecipe[] = await this.prisma.$queryRaw`
          select id, name, value, dateRecipe 
          from tbl_fixedrecipe 
          where id_user = ${user}`;
    
        const expense: Expense[] = await this.prisma.$queryRaw`
          select id, name, value, dateexpense as data, id_category as category 
          from tbl_expense 
          where month(dateexpense) = ${date} and id_user = ${user}`;
    
        const fixedExpense: Fixedexpense[] = await this.prisma.$queryRaw`
          select id, name, value, id_category as category, dateExpense 
          from tbl_fixedexpense 
          where id_user = ${user}`;
    
        recipe.forEach((element) => {
          saldo += element.value;
        });
    
        fixedRecipe.forEach((element) => {
          saldo += element.value;
        });
    
        fixedExpense.forEach((element) => {
          saldo -= element.value;
        });
    
        expense.forEach((element) => {
          saldo -= element.value;
        });
    
        return {
          recipe: recipe,
          fixedrecipe: fixedRecipe,
          expense: expense,
          fixedexpense: fixedExpense,
          saldo: saldo
        };
    }
    
    async findDataByDate(date: number, user: number): Promise<{recipe: Receita[], fixedrecipe: Fixedrecipe[], expense: Expense[], fixedexpense: Fixedexpense[]}>{
        const recipe: Receita[] = await this.prisma
          .$queryRaw`select id, name, value, dateRecipe as data 
        from tbl_recipe where year(daterecipe) = ${date} and id_user = ${user}`;
    
        const fixedRecipe: Fixedrecipe[] = await this.prisma
          .$queryRaw`select id, name, value, dateRecipe from tbl_fixedrecipe where id_user = ${user};`;
    
        const expense:Expense[] = await this.prisma
          .$queryRaw`select id, name, value,dateexpense as data, id_category as category 
        from tbl_expense where year(dateexpense) = ${date} and id_user = ${user};`;
    
        const fixedExpense: Fixedexpense[] = await this.prisma
          .$queryRaw`select id, name, value,dateExpense, id_category as category from tbl_fixedexpense where id_user = ${user};`;

          return{
            recipe: recipe,
            fixedrecipe: fixedRecipe,
            expense: expense,
            fixedexpense: fixedExpense,
          }
          
      }

      async login(email:string, password:string): Promise<Login>{
        const user = await this.prisma.tbl_users.findFirst({
          where: {
            email: email,
            password: password
          },
        });
        if(user)
          return user;
        else{
          throw new NotFoundException('Usuario não encontrada');
        }
      }
}