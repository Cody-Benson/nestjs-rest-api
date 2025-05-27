import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./users.service";
import { User } from "./users.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { TestUtil } from "../../test/utils/user-test.util";
import { Repository } from "typeorm";

describe('UserService test suite',()=>{
    let userService:UserService;
    let userRepository: Repository<User>;
    let mockUserRepository = {
        find: jest.fn(),
        save: jest.fn(),
        findOneBy: jest.fn(),
        delete: jest.fn()
    };

    beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[UserService,{
                provide:getRepositoryToken(User),
                useValue:mockUserRepository
            }]
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined',()=>{
        expect(userService).toBeDefined();
    });

    it('should return users', async ()=>{
        const USERS_TO_CREATE = 2;
        const users = TestUtil.createTestUsers(USERS_TO_CREATE);
        mockUserRepository.find.mockResolvedValue(users);

        const result = await userService.getUsers();
        expect(result).toEqual(users);
    });

    it('should return a user',async ()=>{
        const user:User = TestUtil.createTestUser();
        mockUserRepository.findOneBy.mockResolvedValue(user);
        
        const result = await userService.getUserById(1);

        expect(result).toEqual(user);
    });

    it('should update a user',async ()=>{
        const id = 1;
        const updateUserDTO:UpdateUserDTO = TestUtil.createTestUpdateUserDTO();
        const user:User = {
            id:id,
            ...updateUserDTO
        }
        mockUserRepository.save.mockResolvedValue(user);

        const result = await userService.updateUser(id, updateUserDTO);

        expect(result).toEqual(user);
    });

    it('should create a new user', async ()=>{
        const id = 1;
        const createUserDTO:CreateUserDTO = TestUtil.createTestUserDTO();
        const user:User = {
            id:id,
            ...createUserDTO
        }
        mockUserRepository.save.mockResolvedValue(user);

        const result = await userService.createUser(createUserDTO);

        expect(result).toEqual(user);
    });
});