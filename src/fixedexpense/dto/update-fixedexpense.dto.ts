import { PartialType } from '@nestjs/mapped-types';
import { CreateFixedexpenseDto } from './create-fixedexpense.dto';

export class UpdateFixedexpenseDto extends PartialType(CreateFixedexpenseDto) {}
