import { Receita } from "../entities/receita.entity";

export interface RecipeGatewayInterface{

    create(recipe: Receita): Promise<Receita>;
    findAll(): Promise<Receita[]>;
    findOne(id: number): Promise<Receita>;
    update(id: number, recipe: Receita): Promise<Receita>;
    remove(id: number);
    findRecipeByUser(id: number): Promise<Receita[]>
}