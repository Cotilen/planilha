import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDespesaDto } from './create-categoryExpense.dto';

export class UpdateCategoriaDespesaDto extends PartialType(CreateCategoriaDespesaDto) {}
