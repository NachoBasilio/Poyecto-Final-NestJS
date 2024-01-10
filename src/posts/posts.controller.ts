import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Query,
  Param,
  Put,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { PostDocument } from '../models/post.model';
import { PostNotFoundException } from './exceptions/post-not-found.exception';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() post: PostDocument, @Req() req) {
    return this.postsService.create(post, req.user);
  }

  @Get()
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    return this.postsService.findAll(limit, page);
  }

  @Get('user/:userId')
  async findAllByUser(@Param('userId') userId: string) {
    return this.postsService.findAllByUser(userId);
  }

  @Get('search')
  async search(
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('content') content: string,
    @Query('categories') categories: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    limit = limit > 0 ? limit : 10;
    page = page > 0 ? page : 1;
    return this.postsService.search(
      title,
      author,
      content,
      categories,
      limit,
      page,
    );
  }

  @Get('filter')
  async filter(
    @Query('category') category: string,
    @Query('author') author: string,
  ) {
    return this.postsService.filter(category, author);
  }

  @Get(':id')
  async findOne(@Param('id') postId: string) {
    return this.postsService.findOne(postId);
  }

  @Put(':id')
  async update(
    @Param('id') postId: string,
    @Body() updatedPost: PostDocument,
    @Req() req,
  ) {
    try {
      const result = await this.postsService.update(
        postId,
        updatedPost,
        req.user,
      );
      console.log(result);

      if (result) {
        return { success: true, data: result };
      } else {
        return { success: false, message: 'Post not found or not authorized' };
      }
    } catch (error) {
      console.log(error);
      if (error instanceof UnauthorizedException) {
        return { success: false, message: 'Unauthorized' };
      } else if (error instanceof PostNotFoundException) {
        return { success: false, message: 'Post not found' };
      } else {
        return { success: false, message: 'Internal server error' };
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') postId: string, @Req() req) {
    return this.postsService.remove(postId, req.user);
  }
}
