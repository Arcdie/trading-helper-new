import { Module } from '@nestjs/common';

import { PrismaModule } from '../database/prisma/prisma.module';
import { InstrumentModule } from '../instrument/instrument.module';
import { CandleController } from './candle.controller';
import { CandleService } from './candle.service';
import { CandleRepository } from './candle.repository';

@Module({
  imports: [PrismaModule, InstrumentModule],
  controllers: [CandleController],
  providers: [CandleService, CandleRepository],
})
export class CandleModule {}
