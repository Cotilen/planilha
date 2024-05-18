import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateFixedexpenseDto {

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
    @IsNumber()
    id_user:number

    @IsNotEmpty()
    @IsNumber()
    id_category:number

    
    @IsNotEmpty()
    @IsDateString()
    dateExpense:string

    @IsOptional()
    @IsDateString()
    finalDate: string

}
