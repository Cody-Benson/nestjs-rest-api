import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDTO{
    @IsString()
    name:string;
    @IsEmail()
    email:string;
    @IsNotEmpty()
    password:string;
}

export class UpdateUserDTO{
    @IsString()
    name:string;
    @IsEmail()
    email:string;
    @IsNotEmpty()
    password:string;
}