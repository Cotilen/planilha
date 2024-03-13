import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDespesaDto {
    
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    description:string

    @IsNotEmpty()
    @IsNumber()
    value:number

    @IsNotEmpty()
    @IsDateString()
    dateExpense:string

    @IsNotEmpty()
    @IsNumber()
    id_user:number

    @IsNotEmpty()
    @IsNumber()
    id_category:number
}
