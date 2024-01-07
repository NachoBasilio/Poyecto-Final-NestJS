import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

import { UserDocument } from './user.model';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  author: MongooseSchema.Types.ObjectId | UserDocument; // Cambiado a ObjectId o UserDocument

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  categories: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
