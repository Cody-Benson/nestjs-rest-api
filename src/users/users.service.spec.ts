import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./users.service";
import { User } from "./users.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('UserService test suite',()=>{
    let userService:UserService;
    let mockUserRepository = {
        find: jest.fn(()=> {
            return Promise.resolve([{id:1,name:'test1',email:'test1@mail.com',password:'password'},
                {id:2,name:'test2',email:'test2@mail.com',password:'password'}
            ])
        })
    };

    beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[UserService,{
                provide:getRepositoryToken(User),
                useValue:mockUserRepository
            }]
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('should be defined',()=>{
        expect(userService).toBeDefined();
    });

    it('should return users', async ()=>{
        const expected = await Promise.resolve([
            {id:1,name:'test1',email:'test1@mail.com',password:'password'},
            {id:2,name:'test2',email:'test2@mail.com',password:'password'}
        ]);
        expect(await userService.getUsers()).toEqual(expected)
    });
});