import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./users.controller";
import { UserService } from './users.service';
import { User } from "./users.entity";
import { CreateUserDTO, UpdateUserDTO } from "./users.dto";
import { TestUtil } from "../../test/utils/user-test.util";
import { NotFoundException } from "@nestjs/common";
import { DeleteResult } from "typeorm";

describe('UserController test suite',()=>{
    let userController:UserController;
    let userService:UserService;
    const mockUserService = {
        getUsers: jest.fn(),
        getUserById: jest.fn(),
        createUser: jest.fn(),
        deleteUser: jest.fn(),
        updateUser: jest.fn()
    }; 
    
    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers:[{provide:UserService,useValue:mockUserService}],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined',()=>{
        expect(userController).toBeDefined();
    });

    it('should return users',async ()=>{
        const USERS_TO_CREATE = 2;
        let users = TestUtil.createTestUsers(USERS_TO_CREATE);
        mockUserService.getUsers.mockResolvedValue(users)
        
        let result = await userController.getUsers();

        expect(result).toEqual(users);
    });

    describe('getUserById tests',()=>{
        it('should get a user',async ()=>{
            const user:User = TestUtil.createTestUser();
            mockUserService.getUserById.mockResolvedValue(user)

            let result:User|null = await userController.getUserById(user.id);

            expect(result).toEqual(user);
        });

        it('should attempt to get a user and throw NotFoundException',async ()=>{
            mockUserService.getUserById.mockResolvedValue(null);
            
            const id = -1;
            await expect(userController.getUserById(id)).rejects.toThrow(new NotFoundException(`User with id ${id} does not exist`))
        });
    });

    it('should create a new user',async ()=>{
        const user:User = TestUtil.createTestUser();
        mockUserService.createUser.mockResolvedValue(user);
        
        let createUserDTO:CreateUserDTO = {...user};
        let result = await userController.createUser(createUserDTO);

        expect(result).toEqual(user);
    });

    describe('deleteUser() tests',()=>{
        it('should delete a user',async () =>{
            const deleteResult:DeleteResult = {raw:[],affected:1};
            mockUserService.deleteUser.mockResolvedValue(deleteResult);

            const id:number = 1;
            let result = await userController.deleteUser(id);

            expect(result).toEqual(deleteResult);
        });

        it('should attempt to delete user and throw NotFoundException',async ()=>{
            const deleteResult:DeleteResult = {raw:[],affected:0};
            mockUserService.deleteUser.mockResolvedValue(deleteResult)
            
            let id:number = -1;
            await expect(userController.deleteUser(id)).rejects.toThrow(new NotFoundException(`User with id ${id} does not exist`));
        });
    });

    describe('Update user tests',()=>{
        it('should update user',async ()=>{
            const user:User = TestUtil.createTestUser();
            mockUserService.getUserById.mockResolvedValue(user);
            mockUserService.updateUser.mockResolvedValue(user);
            
            const id:number = user.id;
            const updateUserDTO:UpdateUserDTO = {
                ...user
            }
            let result = await userController.updateUser(id, updateUserDTO);

            expect(result).toEqual(user);
        });

        it('should attemp updating user and throw NotFoundException',async ()=>{
            mockUserService.getUserById.mockResolvedValue(null);
            
            const id:number = -1;
            const updateUserDTO:UpdateUserDTO = TestUtil.createTestUpdateUserDTO();
            
            await expect(userController.updateUser(id, updateUserDTO)).rejects.toThrow(new NotFoundException(`User with id ${id} does not exist`));
        });
    });
});