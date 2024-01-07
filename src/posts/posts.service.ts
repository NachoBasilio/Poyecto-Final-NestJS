import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from '../models/post.model';
import { UserDocument } from 'src/models';
import { PostNotFoundException } from './exceptions/post-not-found.exception';

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

    // Verificar si el usuario es el autor o un administrador
    if (user.username !== existingPost.author && !user.isAdmin) {
      throw new UnauthorizedException();
    }

    // Actualizar el post con los nuevos datos
    existingPost.title = updatedPost.title;
    existingPost.content = updatedPost.content;

    // Asegúrate de que la propiedad categories existe en tu modelo
    existingPost.categories = updatedPost.categories || existingPost.categories;

    return existingPost.save();
  }
}
