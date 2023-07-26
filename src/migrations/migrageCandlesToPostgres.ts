import * as fs from 'fs';
import * as path from 'path';
import { INestApplication } from '@nestjs/common';

import { HelperLib } from '../libs/helper.lib';

import { CandleRepository } from '../candle/candle.repository';
import { InstrumentRepository } from '../instrument/instrument.repository';

import { ECandleType } from '../interfaces/candle-type.enum';

export default async (app: INestApplication) => {
  return;
  console.time('migration');
  console.log('Migration started');

  const candleRepository = app.get(CandleRepository);
  const instrumentRepository = app.get(InstrumentRepository);

  const instruments = await instrumentRepository.findInstruments();

  const numberFiles = 11;
  const arr = [...Array(numberFiles).keys()];

  for await (const iteration of arr) {
    console.log('nextFile', iteration);

    const candles = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, `./candles1h-${iteration}.json`),
        'utf-8',
      ),
    );

    const queses = HelperLib.getQueue(candles, 50000);

    for await (const candles of queses) {
      console.log('next 50000');
      candles.forEach((i: any) => {
        delete i._id;

        const targetInstrument = instruments.find(
          (e) => e.name === i.instrument_name,
        );

        delete i.instrument_name;
        i.instrument_id = targetInstrument.instrument_id;
        i.time = new Date(i.time);
        i.created_at = new Date();
      });

      await candleRepository.createCandles(candles, ECandleType['1H']);
    }
  }

  console.timeEnd('migration');
};
