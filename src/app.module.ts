import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModel, PostSchema } from './models';

import { UsersController } from './users/users.controller';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.yu52y7x.mongodb.net/',
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserModel }]),
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    PostsModule,
    UsersModule,
    AdminModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
