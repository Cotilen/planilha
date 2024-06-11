import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CategoryExpense } from "../entities/categoria-despesa.entity";
import { CategoryExpenseGatewayInterface } from "./categoryExpenseGateway-interface";

@Injectable()
export class CategoryExpenseGatewayPrisma implements CategoryExpenseGatewayInterface{

    constructor(private prisma: PrismaService) { }

    async create(expense: CategoryExpense): Promise<CategoryExpense> {
        const category = await this.prisma.tbl_categoryExpense.create({
            data: {
              name: expense.name,
            },
          });

        return category
    }

    async findAll(): Promise<CategoryExpense[]> {
        const categories = await this.prisma.tbl_categoryExpense.findMany();
        return categories
    }

    async findOne(id: number): Promise<CategoryExpense> {
        const category = await this.prisma.tbl_categoryExpense.findUnique({
            where: {
                id: id
            }
        })

        return category
    }

    async update(id: number, expense: CategoryExpense): Promise<CategoryExpense> {
        const category = await this.prisma.tbl_categoryExpense.update({
            where: {
                id: id
            },
            data: {
                name: expense.name
            }
        })

        return category
    }

    async remove(id: number){
        const category = await this.prisma.tbl_categoryExpense.delete({
            where: {
                id: id
            }
        })

        return{
            mensagem: `A categoria com o ID ${id} foi removida com sucesso!`
        }
    }
}