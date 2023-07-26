import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { MomentLib } from '../libs/moment.lib';

import { PrismaService } from '../database/prisma/prisma.service';

import { GET_CANDLES_LIMIT } from './candle.constants';
import { ICandle } from '../interfaces/candle.interface';
import { ECandleType } from '../interfaces/candle-type.enum';
import { GetCandlesDto } from './dto/get-candles.dto';

@Injectable()
export class CandleRepository {
  private candle5mRepository: Prisma.Candle5mModelDelegate;
  private candle1hRepository: Prisma.Candle1hModelDelegate;
  private candle1dRepository: Prisma.Candle1dModelDelegate;

  constructor(prisma: PrismaService) {
    this.candle5mRepository = prisma.candle5mModel;
    this.candle1hRepository = prisma.candle1hModel;
    this.candle1dRepository = prisma.candle1dModel;
  }

  async createCandles(data: ICandle[], type: ECandleType) {
    const repository = this.getRepositoryByCandleType(type);
    const result = await repository.createMany({ data });
    return result.count;
  }

  async findCandles(
    { instrumentId, startTime, endTime }: GetCandlesDto,
    type: ECandleType,
  ) {
    const repository = this.getRepositoryByCandleType(type);
    const searchParams:
      | Prisma.Candle5mModelWhereInput
      | Prisma.Candle1hModelWhereInput
      | Prisma.Candle1dModelWhereInput = {
      instrument_id: instrumentId,
    };

    if (startTime) {
      startTime = new Date(MomentLib.getStartOfMinute(startTime));
    }

    if (endTime) {
      endTime = new Date(MomentLib.getStartOfMinute(endTime));
    }

    if (startTime && endTime) {
      searchParams.AND = [
        { time: { gt: startTime } },
        { time: { lt: endTime } },
      ];
    } else if (startTime) {
      searchParams.time = { gt: startTime };
    } else if (endTime) {
      searchParams.time = { lt: endTime };
    }

    const result = await (repository as any).findMany({
      where: searchParams,
      take: GET_CANDLES_LIMIT,
      orderBy: [{ time: 'desc' }],
    });

    return result;
  }

  private getRepositoryByCandleType(type: ECandleType) {
    let repository:
      | Prisma.Candle5mModelDelegate
      | Prisma.Candle1hModelDelegate
      | Prisma.Candle1dModelDelegate;

    switch (type) {
      case ECandleType['5M']:
        repository = this.candle5mRepository;
        break;
      case ECandleType['1H']:
        repository = this.candle1hRepository;
        break;
      case ECandleType['1D']:
        repository = this.candle1dRepository;
        break;
      default:
        throw new Error('Undefined candle type');
    }

    return repository;
  }
}
