import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from '../models/post.model';
import { UserDocument } from 'src/models';
import { Types } from 'mongoose';
import { PostNotFoundException } from './exceptions/post-not-found.exception';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<PostDocument>,
  ) {}

  async create(post: PostDocument, user: UserDocument): Promise<PostDocument> {
    const authorId = user instanceof Types.ObjectId ? user : user._id;

    post.author = authorId;
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

  async findOne(postId: string): Promise<PostDocument> {
    return this.postModel.findById(postId).exec();
  }

  async update(
    postId: string,
    updatedPost: PostDocument,
    user: UserDocument,
  ): Promise<PostDocument | null> {
    const existingPost = await this.postModel.findById(postId).exec();

    if (!existingPost) {
      throw new PostNotFoundException();
    }

    if (user._id !== existingPost.author && !user.isAdmin) {
      throw new UnauthorizedException();
    }

    existingPost.title = updatedPost.title;
    existingPost.content = updatedPost.content;

    existingPost.categories = updatedPost.categories || existingPost.categories;

    return existingPost.save();
  }

  async remove(postId: string, user: UserDocument): Promise<boolean> {
    const existingPost = await this.postModel.findById(postId).exec();

    if (!existingPost) {
      return false;
    }

    const isAuthorOrAdmin =
      user.isAdmin || existingPost.author.toString() === user._id.toString();

    if (!isAuthorOrAdmin) {
      return false;
    }

    await existingPost.deleteOne();
    return true;
  }

  async findAllByUser(userId: string): Promise<PostDocument[]> {
    return this.postModel.find({ author: userId }).exec();
  }
}
