import { JwtService } from '@nestjs/jwt';
import { User } from 'src/interfaces';
export declare class AuthService {
    private jwtService;
    testUser: User;
    constructor(jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): {
        access_token: string;
    };
}
