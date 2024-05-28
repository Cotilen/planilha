import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceitaDto } from './dto/create-recipe.dto';
import { UpdateReceitaDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { format, utcToZonedTime } from 'date-fns-tz';
import { RecipeGatewayInterface } from './gateways/recipe-gateway-interface';
import { Receita } from './entities/receita.entity';

@Injectable()
export class ReceitaService {
  constructor(
    private prisma: PrismaService,
    @Inject('RecipeGatewayInterface')
    private recipeGateway: RecipeGatewayInterface,
  ) { }
  async create(body: CreateReceitaDto) {
    const data = new Date(body.dateRecipe);
    const recipe = new Receita(
      body.name,
      body.value,
      body.dateRecipe,
      body.id_user,
    );
    const gateway = await this.recipeGateway.create(recipe);
    return {
      recipe: gateway,
    };
  }

  async findAll() {
    const recipe = await this.recipeGateway.findAll();

    return { recipe };
  }

  async findOne(id: number) {
    const recipe = await this.recipeGateway.findOne(id);

    return { recipe };
  }

  async update(id: number, updateReceitaDto: UpdateReceitaDto) {
    const recipe = await this.recipeGateway.update(id, updateReceitaDto as Receita);

    return { recipe };
  }

  async remove(id: number) {
    const recipe = await this.recipeGateway.remove(id);

    return recipe;
  }

  async findRecipeByUser(id: number) {
    const recipe = await this.recipeGateway.findRecipeByUser(id)

    return { recipe };
  }
}
