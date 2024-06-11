import { CategoryExpense } from "../entities/categoria-despesa.entity";

export interface CategoryExpenseGatewayInterface{
    create(expense: CategoryExpense): Promise<CategoryExpense>
    findAll(): Promise<CategoryExpense[]>
    findOne(id: number): Promise<CategoryExpense>
    update(id: number, expense: CategoryExpense): Promise<CategoryExpense>
    remove(id: number)
}
