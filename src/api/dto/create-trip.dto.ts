import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  Matches,
} from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  @Matches(`[a-zA-Z]+ [0-9]+, [a-zA-Z]+, [a-zA-Z]+`)
  start_address: string;

  @IsString()
  @IsNotEmpty()
  @Matches(`[a-zA-Z]+ [0-9]+, [a-zA-Z]+, [a-zA-Z]+`)
  destination_address: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;
}
