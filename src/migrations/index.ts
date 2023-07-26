import { INestApplication } from '@nestjs/common';

import setInstrumentPrices from './setInstrumentPrices';
import migrageCandlesToPostgres from './migrageCandlesToPostgres';
import migrateInstrumentsToPostgres from './migrateInstrumentsToPostgres';

export default async (app: INestApplication) => {
  // await setInstrumentPrices(app);
  // await migrageCandlesToPostgres(app);
  // await migrateInstrumentsToPostgres(app);
};
