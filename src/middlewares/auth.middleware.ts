import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

import { UserRepository } from '../user/user.repository';

import { EErrorCode } from '../interfaces/error-code.interface';
import { ConfigService } from '@nestjs/config';

export const getTokenFromRequest = (req: Request): string | null =>
  req.cookies?.authorization ||
  req.cookies?.Authorization ||
  req.headers?.authorization ||
  req.headers?.Authorization;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token = getTokenFromRequest(req);

    if (!token) {
      throw new UnauthorizedException(EErrorCode.INVALID_AUTH_TOKEN);
    }

    if (token.includes('Bearer ')) {
      token = token.replace('Bearer ', '');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('jwt.secret'),
      });

      const user = await this.userRepository.findOneById(payload.userId);

      if (!user) {
        throw new NotFoundException(EErrorCode.NO_USER_WITH_THIS_ID);
      }

      req.user = user;
      next();
    } catch (err) {
      console.log('err', err);
      throw new UnauthorizedException(EErrorCode.INVALID_AUTH_TOKEN);
    }
  }
}
