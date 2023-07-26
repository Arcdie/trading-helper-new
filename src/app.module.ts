import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import databaseConfig from './config/database.config';

import { PrismaModule } from './database/prisma/prisma.module';
import { InstrumentModule } from './instrument/instrument.module';
import { CandleModule } from './candle/candle.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    PrismaModule,
    CandleModule,
    InstrumentModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
