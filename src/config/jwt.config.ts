import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService, registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
}));

export const getJWTConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get('jwt.secret'),
  };
};
