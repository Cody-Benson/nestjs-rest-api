import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";

describe('UserController test suite',()=>{
    let userController:UserController;
    const mockUserService = {
        getUsers: jest.fn(()=>{
            return Promise.resolve([
                {id:1,name:'test1',email:'test1@mail.com',password:'password'},
                {id:2,name:'test2',email:'test2@mail.com',password:'password'}
            ]);
    })};
    
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
        const expected = await Promise.resolve([
            {id:1,name:'test1',email:'test1@mail.com',password:'password'},
            {id:2,name:'test2',email:'test2@mail.com',password:'password'}
        ]);
        
        expect(await userController.getUsers()).toEqual(expected);
    });
});