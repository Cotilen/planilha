import { PartialType } from '@nestjs/mapped-types';
import { CreateFixedrecipeDto } from './create-fixedrecipe.dto';

export class UpdateFixedrecipeDto extends PartialType(CreateFixedrecipeDto) {}
