import { PrismaService } from "src/prisma/prisma.service";
import { RecipeGatewayInterface } from "./recipe-gateway-interface";
import { Receita } from "../entities/receita.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { log } from "console";
import { format, utcToZonedTime } from "date-fns-tz";

@Injectable()
export class RecipeGatewayPrisma implements RecipeGatewayInterface {

    constructor(
        private prisma: PrismaService,
    ) { }

    async create(recipe: Receita): Promise<Receita> {

        const data = new Date(recipe.dateRecipe)
        const receita = await this.prisma.tbl_recipe.create({
            data: {
                name: recipe.name,
                value: recipe.value,
                dateRecipe: data,
                id_user: recipe.id_user,
            }
        });

        const result = this.converter(receita);

        return result
    }

    async findAll(): Promise<Receita[]> {
        const recipeBd = await this.prisma.tbl_recipe.findMany();
        const recipe: Receita[] = recipeBd.map((receita) => {
            const dateRecipeUTC = utcToZonedTime(receita.dateRecipe, 'UTC');
            const formatedDate = format(dateRecipeUTC, 'dd/MM/yyyy', {
                timeZone: 'UTC',
            });

            return {
                ...receita,
                dateRecipe: formatedDate,
            };
        });

        return recipe
    }

    async findOne(id: number): Promise<Receita> {
        const recipeBd = await this.prisma.tbl_recipe.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (recipeBd == null) {
            throw new NotFoundException('Receita não encontrada');
        } else {
            const dateRecipeUTC = utcToZonedTime(recipeBd.dateRecipe, 'UTC');
            const formatedDate = format(dateRecipeUTC, 'dd/MM/yyyy', {
                timeZone: 'UTC',
            });

            let recipe = {
                id: recipeBd.id,
                name: recipeBd.name,
                value: recipeBd.value,
                dateRecipe: formatedDate,
                id_user: recipeBd.id_user,
            };

            return recipe;
        }
    }

    async update(id: number, receita: Receita): Promise<Receita> {
        const validationID = await this.prisma.tbl_recipe.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (validationID == null) {
            throw new NotFoundException('Receita não encontrada');
        } else {
            const recipe = await this.prisma.tbl_recipe.update({
                data: {
                    name: receita.name,
                    value: receita.value,
                    dateRecipe: new Date(receita.dateRecipe),
                },
                where: {
                    id: Number(id),
                },
            });

            const result = this.converter(recipe);


            return result
        }
    }

    async remove(id: number) {
        const validationId = await this.prisma.tbl_recipe.findUnique({
            where: {
              id: Number(id),
            },
          });
      
          if (validationId == null) {
            throw new NotFoundException('Receita não encontrada');
          } else {
            const recipe = await this.prisma.tbl_recipe.delete({
              where: {
                id: Number(id),
              },
            });
      
            return {
              mensagem: `A receita com o ID ${id}, foi removida!`,
            };
          }
    }

    async findRecipeByUser(id: number) {
        const validationId = await this.prisma.tbl_users.findUnique({
            where: {
              id: Number(id),
            },
          });
      
          if (validationId == null) {
            throw new NotFoundException('Usuário não encontrado');
          } else {
            const recipeBd = await this.prisma.tbl_recipe.findMany({
              where: {
                id_user: Number(id),
              },
            });
      
            const recipe = recipeBd.map((receita) => {
              const dateRecipeUTC = utcToZonedTime(receita.dateRecipe, 'UTC');
              const formatedDate = format(dateRecipeUTC, 'dd/MM/yyyy', {
                timeZone: 'UTC',
              });
      
              return {
                ...receita,
                dateRecipe: formatedDate,
              };
            });
      
            return recipe;
          }
    }
    converter(receita: { id: number; name: string; value: number; dateRecipe: Date; id_user: number; }) {
        return {
            id: receita.id,
            name: receita.name,
            value: receita.value,
            dateRecipe: format(receita.dateRecipe, 'dd/MM/yyyy', {
                timeZone: 'UTC',
            }),
            id_user: receita.id_user,
        }
    }
}