// users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategies/jwt.strategy';
dotenv.config();
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from '../models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UsersService, LocalStrategy, JwtStrategy],
  exports: [UsersService, JwtModule],
})
export class UsersModule {}
