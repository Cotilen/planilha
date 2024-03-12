import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReceitaDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    value: number

    @IsNotEmpty()
    @IsDateString()
    dateRecipe: string

    @IsNotEmpty()
    @IsInt()
    id_user: number
}
