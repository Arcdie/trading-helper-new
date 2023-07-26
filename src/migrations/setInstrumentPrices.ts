import { INestApplication } from '@nestjs/common';

import { CandleRepository } from '../candle/candle.repository';
import { InstrumentRepository } from '../instrument/instrument.repository';

export default async (app: INestApplication) => {
  return;
  console.time('migration');
  console.log('Migration started');

  /*
  const candleRepository = app.get(CandleRepository);
  const instrumentRepository = app.get(InstrumentRepository);

  const instruments = await instrumentRepository.findInstruments();

  await Promise.all(
    instruments.map(async (instrument) => {
      const lastCandle = await candleRepository.candle1hRepository.findFirst({
        where: { instrument_id: instrument.instrument_id },
        orderBy: [{ time: 'desc' }],
      });

      if (!lastCandle) {
        console.log('No candles', instrument.name);
        return;
      }

      await instrumentRepository.updateInstrument(instrument.instrument_id, {
        price: lastCandle.data[1],
      });
    }),
  );

  console.timeEnd('migration');
  */
};
