import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument, PostSchema } from '../models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<PostDocument>,
  ) {}
}
