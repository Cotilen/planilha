import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Fixedrecipe } from "../entities/fixedrecipe.entity";
import { format, utcToZonedTime } from "date-fns-tz";
import { FixedRecipeGatewayInterface } from "./fixedrecipe-gateway-interface";

@Injectable()
export class FixedRecipeGatewayPrisma implements FixedRecipeGatewayInterface {

    constructor(
        private prisma: PrismaService,
    ) { }

    converter(receita: { id: number; name: string; value: number; dateRecipe: Date; finalDate: Date; id_user: number; }) {
        const dateRecipeUTC = utcToZonedTime(receita.dateRecipe, 'UTC');
        const finalDateRecipeUTC = utcToZonedTime(receita.finalDate, 'UTC');
        return {
            id: receita.id,
            name: receita.name,
            value: receita.value,
            dateRecipe: format(dateRecipeUTC, 'dd/MM/yyyy', {
                timeZone: 'UTC',
            }),
            finalDate: receita.finalDate ? format(finalDateRecipeUTC, 'dd/MM/yyyy', {
                timeZone: 'UTC'
            }) : receita.finalDate,
            id_user: receita.id_user,
        }
    }

    async validationIdRecipe(id: number) {
        const recipe = await this.prisma.tbl_fixedRecipe.findUnique({
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

    async create(recipe: Fixedrecipe): Promise<Fixedrecipe> {
        const receita = await this.prisma.tbl_fixedRecipe.create({
            data: {
                name: recipe.name,
                value: recipe.value,
                id_user: recipe.id_user,
                dateRecipe: new Date(recipe.dateRecipe),
            },
        });

        const result = this.converter(receita);

        return result
    }

    async findAll(): Promise<Fixedrecipe[]> {
        const receitas = await this.prisma.tbl_fixedRecipe.findMany();
        const result = receitas.map((receita) => this.converter(receita));
        return result;
    }

    async findOne(id: number): Promise<Fixedrecipe> {

        const validation = await this.validationIdRecipe(id)

        if (!validation)
            throw new NotFoundException('Receita não encontrada');
        else {
            const recipe = await this.prisma.tbl_fixedRecipe.findUnique({
                where: {
                    id: Number(id),
                },
            });

            const result = this.converter(recipe);
            return result;
        }
    }

    async update(id: number, receita: Fixedrecipe): Promise<Fixedrecipe> {
        const validation = await this.validationIdRecipe(id)

        if (!validation)
            throw new NotFoundException('Receita não encontrada');
        else {
            if (receita.finalDate == null) {
                const recipe = await this.prisma.tbl_fixedRecipe.update({
                    data: {
                        name: receita.name,
                        value: receita.value,
                        dateRecipe: new Date(receita.dateRecipe),
                    },
                    where: {
                        id: Number(id),
                    },
                });

                const result = this.converter(recipe)

                return result;
            } else {
                const recipe = await this.prisma.tbl_fixedRecipe.update({
                    data: {
                        name: receita.name,
                        value: receita.value,
                        dateRecipe: new Date(receita.dateRecipe),
                        finalDate: new Date(receita.finalDate)
                    },
                    where: {
                        id: Number(id),
                    },
                });
                const result = this.converter(recipe)

                return result;
            }
        }
    }

    async remove(id: number) {
        const validation = await this.validationIdRecipe(id)
        console.log(validation);
        

        if (!validation)
            throw new NotFoundException('Receita não encontrada');
        else {
            const recipe = await this.prisma.tbl_fixedRecipe.delete({
                where: {
                  id: Number(id),
                },
              });
        
              return {
                mensagem: `A receita com o ID ${id}, foi removida!`,
              };
            }
    }

    async findRecipeByUser(id: number): Promise<Fixedrecipe[]> {
        const validation = this.validationIdUser(id)

        if (!validation)
            throw new NotFoundException('Usuário não encontrado');
        else {
            const recipe = await this.prisma.tbl_fixedRecipe.findMany({
                where: {
                  id_user: Number(id),
                },
              });

              return recipe.map((receita) => this.converter(receita));
            }


    }
}