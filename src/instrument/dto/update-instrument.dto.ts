import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateInstrumentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsNumber()
  @IsOptional()
  price_precision?: number;

  @IsNumber()
  @IsOptional()
  tick_size?: number;

  @IsNumber()
  @IsOptional()
  step_size?: number;

  @IsNumber()
  @IsOptional()
  average_volume_for_last_24_hours?: number;

  @IsNumber()
  @IsOptional()
  average_volume_for_last_15_minutes?: number;
}
