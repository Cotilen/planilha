import { FixedRecipeGatewayInterface } from './gateways/fixedrecipe-gateway-interface';
import { Inject, Injectable } from '@nestjs/common';
import { CreateFixedrecipeDto } from './dto/create-fixedrecipe.dto';
import { UpdateFixedrecipeDto } from './dto/update-fixedrecipe.dto';
import { Fixedrecipe } from './entities/fixedrecipe.entity';

@Injectable()
export class FixedrecipeService {

  constructor(
    @Inject('FixedRecipeGatewayInterface')
    private recipeGateway: FixedRecipeGatewayInterface,
  ) { }

  async create(createFixedrecipeDto: CreateFixedrecipeDto) {
    const gateway = await this.recipeGateway.create(createFixedrecipeDto)

    return {
      recipe: gateway,
    };
  }

  async findAll() {
    const gateway = await this.recipeGateway.findAll()

    return {
      recipe: gateway,
    };
  }

  async findOne(id: number) {
    const gateway = await this.recipeGateway.findOne(id)

    return {
      recipe: gateway,
    };
  }
  async update(id: number, body: UpdateFixedrecipeDto) {
    const gateway = await this.recipeGateway.update(id,body as Fixedrecipe)

    return {
      recipe: gateway,
    };
  }

  async remove(id: number) {
      const gateway = await this.recipeGateway.remove(id)

      return {
        recipe: gateway,
      };
  }

  async findRecipeByUser(id: number) {
    const gateway = await this.recipeGateway.findRecipeByUser(id)

    return {
      recipe: gateway
    }

  }
}
