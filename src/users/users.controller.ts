import { Controller,Get, NotFoundException,HttpStatus } from "@nestjs/common";
import { UserService } from './users.service';
import { User } from "./users.entity";

@Controller('/users')
export class UserController{
    constructor(private userService: UserService){}
    
    @Get()
    getUsers(){
        return this.userService.getUsers();
    }
}