export interface IInstrument {
  name: string;
  price: number;
  is_active: boolean;
  is_futures: boolean;
  price_precision: number;
  tick_size: number;
  step_size: number;
  average_volume_for_last_24_hours: number;
  average_volume_for_last_15_minutes: number;
}
