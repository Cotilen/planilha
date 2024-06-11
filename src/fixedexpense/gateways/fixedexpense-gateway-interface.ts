import { Fixedexpense } from "../entities/fixedexpense.entity";

export interface FixedExpenseGatewayInterface{
    create(expense: Fixedexpense): Promise<Fixedexpense>
    findAll(): Promise<Fixedexpense[]>
    findOne(id: number) : Promise<Fixedexpense>
    update(id: number, expense: Fixedexpense): Promise<Fixedexpense>
    remove(id: number)
    findExpenseByUser(id: number) : Promise<Fixedexpense[]>
}