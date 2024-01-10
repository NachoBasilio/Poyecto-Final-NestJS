import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class AdminService {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  async getUsers() {
    return this.usersService.findAll();
  }

  async deleteUser(id: string) {
    return this.usersService.delete(id);
  }

  async getPosts() {
    return this.postsService.findAll();
  }
}
