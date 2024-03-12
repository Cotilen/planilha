import { PartialType } from '@nestjs/mapped-types';
import { CreateDespesaDto } from './create-expense.dto';

export class UpdateDespesaDto extends PartialType(CreateDespesaDto) {}
