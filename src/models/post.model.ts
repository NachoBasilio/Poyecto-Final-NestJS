import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  categories: string[];
}

export const PostModel = SchemaFactory.createForClass(Post);
