import { User } from "./users.entity";
import { UserService } from "./users.service";

describe('UserService test suite',()=>{
    let userService:UserService;

    beforeEach(()=>{
        userService = new UserService();
    });

    it('should be defined',()=>{
        expect(userService).toBeDefined();
    });

    describe('getUsers() test suite',()=>{
        let user1:User;
        let user2:User;
        let PASSWORD = 'password';
        
        beforeEach(() => {
            user1 = userService.getUsers()[0];
            user2 = userService.getUsers()[1];
        });
        
        it('First user should be cody',()=>{
            expect(user1.id).toBe(1);
            expect(user1.name).toBe('cody');
            expect(user1.email).toBe('cody@mail.com');
            expect(user1.password).toBe(PASSWORD);
        });

        it('Second user should be john',()=>{
            expect(user2.id).toBe(2);
            expect(user2.name).toBe('john');
            expect(user2.email).toBe('john@mail.com');
            expect(user2.password).toBe(PASSWORD);
        });
    });
});