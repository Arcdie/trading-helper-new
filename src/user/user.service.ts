import { Injectable } from '@nestjs/common';

import { BcryptLib } from '../libs/bcrypt.lib';

import { UserRepository } from './user.repository';

import { SALT_ROUNDS } from './user.constants';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(registerDto: RegisterDto) {
    const hashedPassword = await this.hashPassword(registerDto.password);

    return this.userRepository.createUser({
      ...registerDto,
      password: hashedPassword,
    });
  }

  async hashPassword(password: string) {
    const salt = await BcryptLib.getSalt(SALT_ROUNDS);
    return BcryptLib.hash(password, salt);
  }
}
