import { Expense } from "../entities/despesa.entity";

export interface ExpenseGatewayInterface{
    create(expense: Expense): Promise<Expense>;
    findAll(): Promise<Expense[]>;
    findOne(id: number): Promise<Expense>;
    update(id: number, expense: Expense): Promise<Expense>;
    remove(id: number);
    findExpenseByUser(id: number): Promise<Expense[]>
}