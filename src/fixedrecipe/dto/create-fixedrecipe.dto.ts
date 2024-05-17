import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateFixedrecipeDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    value: number

    @IsNotEmpty()
    @IsInt()
    id_user: number

    @IsNotEmpty()
    @IsDateString()
    dateRecipe: string

    @IsOptional()
    @IsDateString()
    finalDate: string
}

export class FinalDateDto {
    @IsNotEmpty()
    @IsDateString()
    finalDate: string
}