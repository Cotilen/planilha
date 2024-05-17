import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFixedrecipeDto, FinalDateDto } from './dto/create-fixedrecipe.dto';
import { UpdateFixedrecipeDto } from './dto/update-fixedrecipe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FixedrecipeService {
  constructor(private prisma: PrismaService) {}

  async create(createFixedrecipeDto: CreateFixedrecipeDto) {
    const recipe = await this.prisma.tbl_fixedRecipe.create({
      data: {
        name: createFixedrecipeDto.name,
        value: createFixedrecipeDto.value,
        id_user: createFixedrecipeDto.id_user,
        dateRecipe: new Date(createFixedrecipeDto.dateRecipe),
      },
    });
    return { recipe };
  }

  async findAll() {
    const recipe = await this.prisma.tbl_fixedRecipe.findMany();

    return { recipe };
  }

  async findOne(id: number) {
    const recipe = await this.prisma.tbl_fixedRecipe.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (recipe == null) {
      throw new NotFoundException('Receita não encontrada');
    } else {
      return { recipe };
    }
  }
  async update(id: number, updateFixedrecipeDto: UpdateFixedrecipeDto) {
    const validationID = await this.prisma.tbl_fixedRecipe.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationID == null) {
      throw new NotFoundException('Receita não encontrada');
    } else {
      if(updateFixedrecipeDto.finalDate == null) {
        const recipe = await this.prisma.tbl_fixedRecipe.update({
          data: {
            name: updateFixedrecipeDto.name,
            value: updateFixedrecipeDto.value,
            dateRecipe: new Date(updateFixedrecipeDto.dateRecipe),
          },
          where: {
            id: Number(id),
          },
        });
  
        return { receita: recipe };
      }else{
        const recipe = await this.prisma.tbl_fixedRecipe.update({
          data: {
            name: updateFixedrecipeDto.name,
            value: updateFixedrecipeDto.value,
            dateRecipe: new Date(updateFixedrecipeDto.dateRecipe),
            finalDate:new Date(updateFixedrecipeDto.finalDate) 
          },
          where: {
            id: Number(id),
          },
        });
  
        return { receita: recipe };
      }
   
    }
  }

  async remove(id: number) {
    const validationId = await this.prisma.tbl_fixedRecipe.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationId == null) {
      throw new NotFoundException('Receita não encontrada');
    } else {
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

  async findRecipeByUser(id: number) {
    
    const validationId = await this.prisma.tbl_users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationId == null) {
      throw new NotFoundException('Usuáiro não encontrado');
    } else {
      const recipe = await this.prisma.tbl_fixedRecipe.findMany({
        where: {
          id_user: Number(id),
        },
      });

      return { recipe };
    }
  }

  async updateFinalDate(id: number, updateFixedrecipeDto: FinalDateDto) {
    const validationID = await this.prisma.tbl_fixedRecipe.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (validationID == null) {
      throw new NotFoundException('Receita não encontrada');
    } else {
      const recipe = await this.prisma.tbl_fixedRecipe.update({
        data: {
          finalDate: new Date(updateFixedrecipeDto.finalDate),
        },
        where: {
          id: Number(id),
        },
      });

      return { receita: recipe };
    }
  }
}
