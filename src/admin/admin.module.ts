import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminMiddleware } from '../middleware/AdminMiddleware';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { JwtStrategy } from '../users/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from '../middleware/JwtMiddleware';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AdminService, JwtStrategy],
  controllers: [AdminController],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, AdminMiddleware).forRoutes('admin');
  }
}
