import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }

  @Post('/registration')
  async registration(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }
}
