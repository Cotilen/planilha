import { IsNotEmpty, IsNumber, IsString } from "class-validator"

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
}