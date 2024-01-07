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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { PostDocument } from '../models/post.model';

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
    return this.postsService.update(postId, updatedPost, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') postId: string, @Req() req) {
    return this.postsService.remove(postId, req.user);
  }

  @Get('user/:userId')
  async findAllByUser(@Param('userId') userId: string) {
    return this.postsService.findAllByUser(userId);
  }
}
