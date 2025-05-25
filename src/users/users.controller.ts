import { Controller,Get, NotFoundException,HttpStatus, Body, ValidationPipe, Post } from "@nestjs/common";
import { UserService } from './users.service';
import { User } from "./users.entity";
import { CreateUserDTO } from "./users.dto";

@Controller('/users')
export class UserController{
    constructor(private userService: UserService){}
    
    @Get()
    getUsers(){
        return this.userService.getUsers();
    }

    @Post()
    createUser(@Body(new ValidationPipe()) createUserDTO:CreateUserDTO){
        return this.userService.createUser(createUserDTO);
    }
}