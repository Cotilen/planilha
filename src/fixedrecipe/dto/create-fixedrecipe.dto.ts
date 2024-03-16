import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

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
}