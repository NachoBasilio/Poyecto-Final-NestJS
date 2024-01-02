import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces';

@Injectable()
export class AuthService {
  testUser: User;

  constructor() {
    this.testUser = {
      id: 1,
      name: 'nacho',
      password: 'test',
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    if (
      this.testUser?.name == username &&
      this.testUser?.password === password
    ) {
      return {
        userId: this.testUser.id,
        username: this.testUser.name,
      };
    }
    return null;
  }
}
