import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "./users.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>){}
    
    getUsers():Promise<User[]>{
        return this.usersRepository.find();
    }

    createUser(createUserDTO:CreateUserDTO){
        let userEntity:User = new User();
        userEntity.name = createUserDTO.name;
        userEntity.email = createUserDTO.email;
        userEntity.password = createUserDTO.password;

        return this.usersRepository.save(userEntity);
    }
}