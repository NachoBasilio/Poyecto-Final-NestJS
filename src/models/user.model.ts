import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  })
  username: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;
}

export type UserDocument = User & Document;

export const UserModel = SchemaFactory.createForClass(User);
