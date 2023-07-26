import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma/prisma.service';

import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserRepository {
  private userRepository: Prisma.UserModelDelegate;

  constructor(prisma: PrismaService) {
    this.userRepository = prisma.userModel;
  }

  async findOneById(userId: number) {
    return this.userRepository.findUnique({
      where: { user_id: userId },
    });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findUnique({ where: { email } });
  }

  async createUser(data: RegisterDto) {
    return this.userRepository.create({ data });
  }
}
