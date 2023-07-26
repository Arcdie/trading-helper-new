import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma/prisma.service';

import { IInstrument } from '../interfaces/instrument.interface';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';

@Injectable()
export class InstrumentRepository {
  private instrumentRepository: Prisma.InstrumentModelDelegate;

  constructor(prisma: PrismaService) {
    this.instrumentRepository = prisma.instrumentModel;
  }

  async findOneById(instrumentId: number) {
    return this.instrumentRepository.findUnique({
      where: { instrument_id: instrumentId },
    });
  }

  async findInstruments({
    isFutures,
  }: {
    isFutures?: boolean;
  } = {}) {
    const searchParams: Prisma.InstrumentModelWhereInput = {
      is_active: true,
    };

    if (typeof isFutures === 'boolean') {
      searchParams.is_futures = isFutures;
    }

    const result = await this.instrumentRepository.findMany({
      where: searchParams,
    });

    return result;
  }

  async createInstruments(data: IInstrument[]) {
    const result = await this.instrumentRepository.createMany({ data });
    return result.count;
  }

  async updateInstrument(instrumentId: number, changes: UpdateInstrumentDto) {
    return this.instrumentRepository.update({
      where: { instrument_id: instrumentId },
      data: changes,
    });
  }
}
