import {
  Get,
  Put,
  Body,
  Param,
  Controller,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';

import { InstrumentRepository } from './instrument.repository';

import { EErrorCode } from '../interfaces/error-code.interface';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';

@Controller('/instruments')
export class InstrumentController {
  constructor(private readonly instrumentRepository: InstrumentRepository) {}

  @Get('/active')
  async getActiveInstruments() {
    return this.instrumentRepository.findInstruments({
      isFutures: true,
    });
  }

  @Put('/:instrumentId')
  async updateInstrument(
    @Body() updateInstrumentDto: UpdateInstrumentDto,
    @Param('instrumentId', ParseIntPipe) instrumentId: number,
  ) {
    const instrument = await this.instrumentRepository.findOneById(
      instrumentId,
    );

    if (!instrument) {
      throw new NotFoundException(EErrorCode.NO_INSTRUMENT_WITH_THIS_ID);
    }

    return this.instrumentRepository.updateInstrument(
      instrument.instrument_id,
      updateInstrumentDto,
    );
  }
}
