import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>){}
    
    getUsers():Promise<User[]>{
        return this.usersRepository.find();
    }

    getUserById(id:number):Promise<User | null>{
        return this.usersRepository.findOneBy({id});
    }

    updateUser(id:number,updateUserDTO:UpdateUserDTO){
        let user:User = {
            id:id,
            ...updateUserDTO
        }
        return this.usersRepository.save(user);
    }

    createUser(createUserDTO:CreateUserDTO):Promise<User>{
        let userEntity:User = new User();
        userEntity.name = createUserDTO.name;
        userEntity.email = createUserDTO.email;
        userEntity.password = createUserDTO.password;

        return this.usersRepository.save(userEntity);
    }

    deleteUser(id:number){
        return this.usersRepository.delete(id);
    }
}