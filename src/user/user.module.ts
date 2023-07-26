import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthMiddleware } from '../middlewares/auth.middleware';

import { PrismaModule } from '../database/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule, JwtModule, ConfigModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
