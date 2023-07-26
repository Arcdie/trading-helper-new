import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  name: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
}));
