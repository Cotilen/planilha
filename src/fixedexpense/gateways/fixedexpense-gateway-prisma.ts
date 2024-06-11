import { Injectable } from "@nestjs/common";
import { FixedExpenseGatewayInterface } from "./fixedexpense-gateway-interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Fixedexpense } from "../entities/fixedexpense.entity";
import { format, utcToZonedTime } from "date-fns-tz";

@Injectable()
export class FixedExpenseGatewayPrisma implements FixedExpenseGatewayInterface {

    constructor(
        private prisma: PrismaService,
    ) { }

    converter(despesa: { id: number; name: string; value: number; dateExpense: Date; finalDate: Date; id_user: number; description: string; id_category: number; }) {
        const dateExpenseUTC = utcToZonedTime(despesa.dateExpense, 'UTC');
        const finalDateExpenseUTC = utcToZonedTime(despesa.finalDate, 'UTC');
        return {
            id: despesa.id,
            name: despesa.name,
            value: despesa.value,
            dateExpense: format(dateExpenseUTC, 'dd/MM/yyyy', {
                timeZone: 'UTC',
            }),
            finalDate: despesa.finalDate ? format(finalDateExpenseUTC, 'dd/MM/yyyy', {
                timeZone: 'UTC'
            }) : despesa.finalDate,
            id_user: despesa.id_user,
            description: despesa.description,
            id_category: despesa.id_category
        }
    }

    async validationIdExpense(id: number) {
        const recipe = await this.prisma.tbl_fixedExpense.findUnique({
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

    async create(expense: Fixedexpense): Promise<Fixedexpense> {

        const despesa = await this.prisma.tbl_fixedExpense.create({
            data: {
                name: expense.name,
                description: expense.description,
                value: expense.value,
                id_user: expense.id_user,
                id_category: expense.id_category,
                dateExpense: new Date(expense.dateExpense)
            }
        })

        return this.converter(despesa);
    }

    async findAll(): Promise<Fixedexpense[]> {
        const despesas = await this.prisma.tbl_fixedExpense.findMany();
        return despesas.map(despesa => this.converter(despesa));
    }

    async findOne(id: number): Promise<Fixedexpense> {
        const validation = await this.validationIdExpense(id)

        if (!validation) {
            throw new Error('Despesa não encontrada');
        } else {
            const expense = await this.prisma.tbl_fixedExpense.findUnique({
                where: {
                    id: Number(id)
                }
            })

            return this.converter(expense);
        }
    }

    async update(id: number, expense: Fixedexpense): Promise<Fixedexpense> {
        const validation = await this.validationIdExpense(id)

        if (!validation) {
            throw new Error('Despesa não encontrada');
        } else {
            if (expense.finalDate == null) {
                const despesa = await this.prisma.tbl_fixedExpense.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        name: expense.name,
                        description: expense.description,
                        value: expense.value,
                        id_category: expense.id_category,
                        dateExpense: new Date(expense.dateExpense)
                    }
                })

                const result = this.converter(despesa)

                return result;
            } else {
                const despesa = await this.prisma.tbl_fixedExpense.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        name: expense.name,
                        description: expense.description,
                        value: expense.value,
                        id_category: expense.id_category,
                        dateExpense: new Date(expense.dateExpense),
                        finalDate: new Date(expense.finalDate)
                    }
                })

                const result = this.converter(despesa)

                return result;
            }
        }
    }

    async remove(id: number) {
        const validation = await this.validationIdExpense(id)

        if (!validation) {
            throw new Error('Despesa não encontrada');
        } else {
            const despesa = await this.prisma.tbl_fixedExpense.delete({
                where: {
                    id: Number(id),
                }
            })

            return {
                mensagem: `A despesa com o ID ${id}, foi removida!`,
            };
        }
    }

    async findExpenseByUser(id: number): Promise<Fixedexpense[]> {
        const validation = await this.validationIdUser(id)

        if (!validation) {
            throw new Error('Usuário não encontrado');
        } else {
            const expense = await this.prisma.tbl_fixedExpense.findMany({
                where: {
                    id_user: Number(id),
                },
            });

            return expense.map(despesa => this.converter(despesa));

        }
    }
}