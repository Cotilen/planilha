import { IsNotEmpty, IsString } from "class-validator"

export class CreateCategoriaDespesaDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string
}
