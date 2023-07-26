import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserModel } from '@prisma/client';

import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EErrorCode } from '../interfaces/error-code.interface';
import { BcryptLib } from '../libs/bcrypt.lib';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  async loginUser(loginDto: LoginDto) {
    const user = await this.userRepository.findOneByEmail(loginDto.email);

    const isCorrectPassword = user
      ? await BcryptLib.compare(loginDto.password, user.password)
      : false;

    if (!user || !isCorrectPassword) {
      throw new NotFoundException(
        EErrorCode.NO_USER_WITH_THIS_EMAIL_AND_PASSWORD,
      );
    }

    const payload = this.getPayloadForJWTToken(user);

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async registerUser(registerDto: RegisterDto) {
    const existUser = await this.userRepository.findOneByEmail(
      registerDto.email,
    );

    if (existUser) {
      throw new BadRequestException(
        EErrorCode.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
      );
    }

    const newUser = await this.userService.createUser(registerDto);
    const payload = this.getPayloadForJWTToken(newUser);

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  private getPayloadForJWTToken(user: UserModel) {
    return { userId: user.user_id, name: user.name };
  }
}
