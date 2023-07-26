import { Controller, Get, NotFoundException, Query } from '@nestjs/common';

import { CandleRepository } from './candle.repository';
import { InstrumentRepository } from '../instrument/instrument.repository';

import { GetCandlesDto } from './dto/get-candles.dto';
import { EErrorCode } from '../interfaces/error-code.interface';

@Controller('/candles')
export class CandleController {
  constructor(
    private readonly candleRepository: CandleRepository,
    private readonly instrumentRepository: InstrumentRepository,
  ) {}

  @Get('/')
  async getCandles(@Query() getCandlesDto: GetCandlesDto) {
    const instrument = await this.instrumentRepository.findOneById(
      getCandlesDto.instrumentId,
    );

    if (!instrument) {
      throw new NotFoundException(EErrorCode.NO_INSTRUMENT_WITH_THIS_ID);
    }

    return this.candleRepository.findCandles(
      getCandlesDto,
      getCandlesDto.period,
    );
  }
}
