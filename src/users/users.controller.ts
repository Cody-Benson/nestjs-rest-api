import { Controller,Get, NotFoundException,HttpStatus, Body, ValidationPipe, Post, Param, ParseIntPipe, Delete, Put, Req, Res } from "@nestjs/common";
import { UserService } from './users.service';
import { User } from "./users.entity";
import { CreateUserDTO, UpdateUserDTO } from "./users.dto";
import { DeleteResult } from "typeorm";
import { Request, Response } from "express";

@Controller('/users')
export class UserController{
    constructor(private userService: UserService){}
    
    @Get()
    getUsers():Promise<User[]>{
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id',ParseIntPipe)id:number): Promise< User | null >{
        let user = await this.userService.getUserById(id);
        if(user === null){
            throw new NotFoundException(`User with id ${id} does not exist`);
        }
        return this.userService.getUserById(id);
    }

    @Put(':id')
    async updateUser(@Param('id',ParseIntPipe) id:number,@Body(new ValidationPipe()) updateUserDTO:UpdateUserDTO, @Req() req:Request, @Res() res:Response): Promise<User>{
        
        let userFound = await this.userService.getUserById(id);
        if(userFound === null){
            throw new NotFoundException(`User with id ${id} does not exist`);
        }
        //res.status(HttpStatus.ACCEPTED).json(await this.userService.updateUser(id,updateUserDTO));
        //return;
        return this.userService.updateUser(id,updateUserDTO);
    }

    @Post()
    createUser(@Body(new ValidationPipe()) createUserDTO:CreateUserDTO):Promise<User>{
        return this.userService.createUser(createUserDTO);
    }

    @Delete(':id')
    async deleteUser(@Param('id',ParseIntPipe) id:number): Promise<DeleteResult>{
        let deleteResult = await this.userService.deleteUser(id);
        if(deleteResult.affected === 0){
            throw new NotFoundException(`User with id ${id} does not exist`);
        }else{
            return deleteResult;
        }
    }
}