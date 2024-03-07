import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReceitaDto {

    @IsNotEmpty()
    @IsString()
    nome: string

    @IsNotEmpty()
    @IsNumber()
    valor: number

    @IsNotEmpty()
    @IsDateString()
    dataReceita: string

    @IsNotEmpty()
    @IsInt()
    id_usuario: number
}
