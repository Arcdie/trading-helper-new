import { UserModel } from '@prisma/client';
import {
  Get,
  Param,
  Controller,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';

import { UserRepository } from './user.repository';

import { User } from '../decorators/user.decorator';
import { SecureUserInterceptor } from '../interceptors/secure-user.interceptor';

@Controller('/users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get('/me')
  async getMe(@User() user: UserModel) {
    return user;
  }

  @Get('/:userId')
  @UseInterceptors(SecureUserInterceptor)
  async getUserByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.userRepository.findOneById(userId);
  }
}
