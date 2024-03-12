import { PartialType } from '@nestjs/mapped-types';
import { CreateReceitaDto } from './create-recipe.dto';

export class UpdateReceitaDto extends PartialType(CreateReceitaDto) {}
