import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class FindLoginDto {

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}
