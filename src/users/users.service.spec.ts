import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./users.service";
import { User } from "./users.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateUserDTO } from "./users.dto";

describe('UserService test suite',()=>{
    let userService:UserService;
    
    let testUser1:User;
    const TEST_ID_1 = 1;
    const TEST_NAME_1 = 'test1';
    const TEST_EMAIL_1 = 'test1@mail.com';
    const TEST_PASSWORD_1 = 'test1password';
        
    let testUser2:User;
    const TEST_ID_2 = 2;
    const TEST_NAME_2 = 'test2';
    const TEST_EMAIL_2 = 'test2@mail.com';
    const TEST_PASSWORD_2 = 'test2password';

    const CREATE_USER_ID = 1;
    const CREATE_USER_NAME = 'test';
    const CREATE_USER_EMAIL = 'test@mail.com';
    const CREATE_USER_PASSWORD = 'testpassword';

    let mockUserRepository = {
        find: jest.fn(()=> {
            return Promise.resolve([
                {id:TEST_ID_1,name:TEST_NAME_1,email:TEST_EMAIL_1,password:TEST_PASSWORD_1},
                {id:TEST_ID_2,name:TEST_NAME_2,email:TEST_EMAIL_2,password:TEST_PASSWORD_2}
            ])
        }),
        save: jest.fn((userEntity:User)=>{
            userEntity.id = CREATE_USER_ID;
            return Promise.resolve({
                ...userEntity
            });
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
        testUser1 = {id:TEST_ID_1,name:TEST_NAME_1,email:TEST_EMAIL_1,password:TEST_PASSWORD_1};
        testUser2 = {id:TEST_ID_2,name:TEST_NAME_2,email:TEST_EMAIL_2,password:TEST_PASSWORD_2};
    });

    it('should be defined',()=>{
        expect(userService).toBeDefined();
    });

    it('should return users', async ()=>{
        const expected = await Promise.resolve([testUser1,testUser2]);
        expect(await userService.getUsers()).toEqual(expected);
    });

    it('should create a new user', async ()=>{
        let createUserDTO:CreateUserDTO = {
                name:CREATE_USER_NAME,
                email:CREATE_USER_EMAIL,
                password:CREATE_USER_PASSWORD
        };
        let expected = await Promise.resolve({
            id:CREATE_USER_ID,
            ...createUserDTO
        });

        expect(await userService.createUser(createUserDTO)).toEqual(expected);
    });
});