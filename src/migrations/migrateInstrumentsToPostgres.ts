import * as fs from 'fs';
import * as path from 'path';
import { INestApplication } from '@nestjs/common';

import { InstrumentRepository } from '../instrument/instrument.repository';

export default async (app: INestApplication) => {
  return;
  console.time('migration');
  console.log('Migration started');

  const instrumentRepository = app.get(InstrumentRepository);

  const instruments = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './instruments.json'), 'utf-8'),
  );

  instruments.forEach((i: any) => {
    delete i._id;
    delete i.does_ignore_volume;
    i.created_at = new Date(i.created_at);
    i.updated_at = new Date(i.updated_at);
  });

  await instrumentRepository.createInstruments(instruments);
  console.timeEnd('migration');
};
