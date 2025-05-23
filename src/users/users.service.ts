import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>){}
    
    getUsers():Promise<User[]>{
        return this.usersRepository.find();
    }
}