import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceitaDto } from './dto/create-recipe.dto';
import { UpdateReceitaDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { format, utcToZonedTime } from 'date-fns-tz';

@Injectable()
export class ReceitaService {
  constructor(private prisma: PrismaService) {}
  async create(createReceitaDto: CreateReceitaDto) {
    const recipe = await this.prisma.tbl_recipe.create({
      data: {
        name: createReceitaDto.name,
        value: createReceitaDto.value,
        dateRecipe: new Date(createReceitaDto.dateRecipe),
        id_user: createReceitaDto.id_user,
      },
    });
    return { recipe };
  }

  async findAll() {
    const recipeBd = await this.prisma.tbl_recipe.findMany();

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

    return { recipe };
  }

  async findOne(id: number) {
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

      return { recipe };
    }
  }

  async update(id: number, updateReceitaDto: UpdateReceitaDto) {
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
          name: updateReceitaDto.name,
          value: updateReceitaDto.value,
          dateRecipe: new Date(updateReceitaDto.dateRecipe),
        },
        where: {
          id: Number(id),
        },
      });

      return { receita: recipe };
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
    const validationId = await this.prisma.tbl_recipe.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationId == null) {
      throw new NotFoundException('Receita não encontrada');
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

      return { recipe };
    }
  }
}
