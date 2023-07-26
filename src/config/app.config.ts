import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  host: 'localhost',
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  environment: process.env.NODE_ENV,
}));
