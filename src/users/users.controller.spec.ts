import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { User } from "./users.entity";
import { CreateUserDTO } from "./users.dto";
import { TestUtil } from "../../test/utils/user-test.util";

describe('UserController test suite',()=>{
    let userController:UserController;
    const NUM_OF_USER_ENTITIES = 2;
    const DEFAULT_ID = 1;
    const mockUserService = {
        getUsers: jest.fn(():Promise<User[]>=>{
            return Promise.resolve(TestUtil.createTestUsers(NUM_OF_USER_ENTITIES));
        }),
        createUser: jest.fn((createUserDTO:CreateUserDTO)=>{
            return Promise.resolve({
                id:DEFAULT_ID,
                ...createUserDTO
            });
        })
    }; 
    
    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers:[UserService],
        })
        .overrideProvider(UserService)
        .useValue(mockUserService)
        .compile();

        userController = module.get<UserController>(UserController);
    });

    it('should be defined',()=>{
        expect(userController).toBeDefined();
    });

    it('should return users',async ()=>{
        const expected = await Promise.resolve(TestUtil.createTestUsers(2));
        expect(await userController.getUsers()).toEqual(expected);
    });

    it('should create a new user',async ()=>{
        const expected:User = await Promise.resolve(TestUtil.createTestUser());
        const createUserDTO:CreateUserDTO = TestUtil.createTestUserDTO();
        expect(await userController.createUser(createUserDTO)).toEqual(expected)
    });
});