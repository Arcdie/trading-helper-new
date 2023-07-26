import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ECandleType } from '../../interfaces/candle-type.enum';

export class GetCandlesDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  instrumentId: number;

  @IsEnum(ECandleType)
  @IsNotEmpty()
  period: ECandleType;

  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @IsDateString()
  @IsOptional()
  endTime?: Date;
}
