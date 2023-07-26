import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';
import { MIN_PASSWORD_LENGTH } from '../../user/user.constants';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Min(MIN_PASSWORD_LENGTH)
  @IsString()
  @IsNotEmpty()
  password: string;
}
