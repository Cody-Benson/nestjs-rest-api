import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";

@Injectable()
export class UserService {
    users:User[];
    constructor(){
        let user1:User = new User(1,'cody','cody@mail.com','password');
        let user2:User = new User(2,'john','john@mail.com','password');

        this.users = [user1,user2];
    }
    
    getUsers():User[]{
        return this.users;
    }
}