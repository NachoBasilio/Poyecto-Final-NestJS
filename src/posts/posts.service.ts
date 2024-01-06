import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from '../models/post.model';
import { UserDocument } from 'src/models';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<PostDocument>,
  ) {}

  // posts.service.ts
  async create(post: PostDocument, user: UserDocument): Promise<PostDocument> {
    post.author = user.username;
    const createdPost = new this.postModel(post);
    return createdPost.save();
  }

  async findAll(limit = 10, page = 1): Promise<PostDocument[]> {
    return this.postModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }
}
