import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./users.service";
import { User } from "./users.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateUserDTO } from "./users.dto";
import { TestUtil } from "../../test/utils/user-test.util";

describe('UserService test suite',()=>{
    let userService:UserService;
    const DEFAULT_USER_ID:number = 1;
    const NUM_OF_USER_ENTITIES = 2;
    let mockUserRepository = {
        find: jest.fn(():Promise<User[]>=> {
            return Promise.resolve(TestUtil.createTestUsers(NUM_OF_USER_ENTITIES))
        }),
        save: jest.fn((userEntity:User)=>{
            userEntity.id = DEFAULT_USER_ID;
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
    });

    it('should be defined',()=>{
        expect(userService).toBeDefined();
    });

    it('should return users', async ()=>{
        const USERS_TO_CREATE = 2;
        const expected = await Promise.resolve(TestUtil.createTestUsers(USERS_TO_CREATE));
        expect(await userService.getUsers()).toEqual(expected);
    });

    it('should create a new user', async ()=>{
        let createUserDTO:CreateUserDTO = TestUtil.createTestUserDTO();
        let DEFAULT_USER_ID = 1;
        let expected = await Promise.resolve({
            id:DEFAULT_USER_ID,
            ...createUserDTO
        });

        expect(await userService.createUser(createUserDTO)).toEqual(expected);
    });
});