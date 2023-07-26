export interface ICandle {
  instrument_id: number;
  data: [number, number, number, number];
  volume: number;
  time: Date;
}
