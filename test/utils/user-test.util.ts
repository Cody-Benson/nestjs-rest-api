import { DeleteResult } from "typeorm";
import { CreateUserDTO, UpdateUserDTO } from "../../src/users/users.dto";
import { User } from "../../src/users/users.entity";
import { NotFoundError } from "rxjs";
import { NotFoundException } from "@nestjs/common";

//export function createMock<T>(fields: Partial<T>): T {
  //return fields as T;
//}

export class TestUtil{
    private static DEFAULT_USER:User = {
        id:1,
        name:"test",
        email:"test@mail.com",
        password:"password"
    }

    private static DEFAULT_CREATE_USER_DTO:CreateUserDTO = {
        name:"test",
        email:"test@mail.com",
        password:"password"
    }

    private static DEFAULT_UPDATE_USER_DTO:UpdateUserDTO = {
        name:"testupdate",
        email:"testupdate@mail.com",
        password:"updatepassword"
    }

    private static DEFAULT_DELETE_USER_SUCCESS:DeleteResult = {
        raw:[],
        affected:1
    }

    constructor(){}
    
    //User entity utils
    static createTestUser():User{
        let user:User = new User();
        user.id=this.DEFAULT_USER.id;
        user.name=this.DEFAULT_USER.name;
        user.email=this.DEFAULT_USER.email;
        user.password=this.DEFAULT_USER.password;
        
        return user;
    }

    static createTestUsers(amount:number):User[]{
        let cur:number = 1;
        let users:User[] = [];

        while(cur <= amount){
            let user:User = this.createTestUser();
            user.id = cur;
            user.name = user.name + cur;
            user.email = `test${cur}@mail.com`;
            user.password = user.password + cur;
            
            users.push(user);
            cur += 1;
        }
        return users;
    }

    //UserDTO utils
    static createTestUserDTO():CreateUserDTO{
        let createUserDTO:CreateUserDTO = new CreateUserDTO();
        createUserDTO.name = this.DEFAULT_CREATE_USER_DTO.name;
        createUserDTO.email = this.DEFAULT_CREATE_USER_DTO.email;
        createUserDTO.password = this.DEFAULT_CREATE_USER_DTO.password;
        
        return createUserDTO;
    }

    static createTestUpdateUserDTO():UpdateUserDTO{
        let updateUserDTO:UpdateUserDTO = new UpdateUserDTO();
        updateUserDTO.name = this.DEFAULT_UPDATE_USER_DTO.name;
        updateUserDTO.email = this.DEFAULT_UPDATE_USER_DTO.email;
        updateUserDTO.password = this.DEFAULT_UPDATE_USER_DTO.password;
        
        return updateUserDTO;
    }

    //Delete user utils
    static createDeleteUserSuccess():DeleteResult{
        let deleteUserSuccess = new DeleteResult();
        deleteUserSuccess.affected = this.DEFAULT_DELETE_USER_SUCCESS.affected;
        deleteUserSuccess.raw = this.DEFAULT_DELETE_USER_SUCCESS.raw;

        return deleteUserSuccess;
    }
}