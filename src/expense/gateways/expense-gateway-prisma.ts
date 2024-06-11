import { Injectable, NotFoundException } from "@nestjs/common";
import { ExpenseGatewayInterface } from "./expense-gateway-interface";
import { Expense } from "../entities/despesa.entity";
import { format, utcToZonedTime } from "date-fns-tz";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ExpenseGatewayPrisma implements ExpenseGatewayInterface {

    constructor(private prisma: PrismaService) { }
    converter(despesa: { id: number; name: string; value: number; dateExpense: Date; id_user: number; description: string; id_category: number; }) {
        const dateExpenseUTC = utcToZonedTime(despesa.dateExpense, 'UTC');
        return {
            id: despesa.id,
            name: despesa.name,
            value: despesa.value,
            dateExpense: format(dateExpenseUTC, 'dd/MM/yyyy', {
                timeZone: 'UTC',
            }),
            id_user: despesa.id_user,
            description: despesa.description,
            id_category: despesa.id_category
        }
    }

    async validationIdExpense(id: number) {
        const recipe = await this.prisma.tbl_expense.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (recipe == null)
            return false;

        return true;

    }

    async validationIdUser(id: number) {
        const validationId = await this.prisma.tbl_users.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (validationId == null)
            return false;

        return true;

    }
    async create(expense: Expense): Promise<Expense> {
        const despesa = await this.prisma.tbl_expense.create({
            data: {
                name: expense.name,
                description: expense.description,
                value: expense.value,
                dateExpense: new Date(expense.dateExpense),
                id_user: expense.id_user,
                id_category: expense.id_category
            }
        })

        return (this.converter(despesa))
    }

    async findAll(): Promise<Expense[]> {
        const despesas = await this.prisma.tbl_expense.findMany();
        return despesas.map(despesa => this.converter(despesa));
    }

    async findOne(id: number): Promise<Expense> {
        const validation = await this.validationIdExpense(id)

        if (!validation)
            throw new NotFoundException('Despesa não encontrada');
        else {
            const expense = await this.prisma.tbl_expense.findUnique({
                where: {
                    id: Number(id)
                }
            })

            return this.converter(expense);
        }
    }

    async update(id: number, expense: Expense): Promise<Expense> {
        const validation = await this.validationIdExpense(id)

        if (!validation) {
            throw new Error('Despesa não encontrada');
        } else {
            const despesa = await this.prisma.tbl_expense.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: expense.name,
                    description: expense.description,
                    value: expense.value,
                    dateExpense: new Date(expense.dateExpense),
                    id_user: expense.id_user,
                    id_category: expense.id_category
                }
            })

            return this.converter(despesa)
        }
    }

    async remove(id: number) {
        const validation = await this.validationIdExpense(id)

        if (!validation)
            throw new NotFoundException('Despesa não encontrada');
        else {
            await this.prisma.tbl_expense.delete({
                where: {
                    id: Number(id)
                }
            })

            return {
                mensagem: `A despesa com o ID ${id} foi removida com sucesso`
            }
        }
    }

    async findExpenseByUser(id: number) {
        const validation = await this.validationIdUser(id)

        if (!validation)
            throw new NotFoundException('Usuário não encontrado');
        else {
            const expense = await this.prisma.tbl_expense.findMany({
                where: {
                    id_user: Number(id),
                },
            });

            return expense.map((despesa) => this.converter(despesa));

        }
    }
}