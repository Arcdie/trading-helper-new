import { Module } from '@nestjs/common';

import { PrismaModule } from '../database/prisma/prisma.module';
import { InstrumentController } from './instrument.controller';
import { InstrumentService } from './instrument.service';
import { InstrumentRepository } from './instrument.repository';

@Module({
  imports: [PrismaModule],
  controllers: [InstrumentController],
  providers: [InstrumentService, InstrumentRepository],
  exports: [InstrumentRepository],
})
export class InstrumentModule {}
