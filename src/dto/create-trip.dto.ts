import { IsNumber } from 'class-validator';

export class CreateTripDto {
  @IsNumber()
  time!: number;

  @IsNumber()
  speed!: number;

  @IsNumber()
  speedLimit!: number;

  @IsNumber()
  lat!: number;

  @IsNumber()
  lon!: number;
}
