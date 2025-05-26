import { CreateUserDTO } from "../../src/users/users.dto";
import { User } from "../../src/users/users.entity";

const DEFAULT_USER:User = {
    id:1,
    name:"test",
    email:"test@mail.com",
    password:"password"
}

const DEFAULT_CREATE_USER_DTO:CreateUserDTO = {
    name:"test",
    email:"test@mail.com",
    password:"password"
}

//User entity utils
export function createTestUser(){
    let user:User = new User();
    user.id=DEFAULT_USER.id;
    user.name=DEFAULT_USER.name;
    user.email=DEFAULT_USER.email;
    user.password=DEFAULT_USER.password;
    
    return user;
}

export function createTestUsers(amount:number){
    let cur:number = 1;
    let users:User[] = [];

    while(cur <= amount){
        let user:User = createTestUser();
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
export function createTestUserDTO(){
    let createUserDTO:CreateUserDTO = new CreateUserDTO();
    createUserDTO.name = DEFAULT_CREATE_USER_DTO.name;
    createUserDTO.email = DEFAULT_CREATE_USER_DTO.email;
    createUserDTO.password = DEFAULT_CREATE_USER_DTO.password;
    
    return createUserDTO;
}