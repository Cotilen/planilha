import { Fixedrecipe } from './../entities/fixedrecipe.entity';
export interface FixedRecipeGatewayInterface {
    create(receita: Fixedrecipe): Promise<Fixedrecipe>
    findAll(): Promise<Fixedrecipe[]>
    findOne(id: number): Promise<Fixedrecipe>
    update(id: number, receita: Fixedrecipe): Promise<Fixedrecipe>
    remove(id: number)
    findRecipeByUser(id: number): Promise<Fixedrecipe[]>
}