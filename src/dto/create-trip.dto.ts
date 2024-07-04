import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

class CoordinatesDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;
}

export class ReadingDto {
  @IsNumber()
  time: number;

  @IsNumber()
  speed: number;

  @IsNumber()
  speedLimit: number;

  @ValidateNested()
  @Type(() => CoordinatesDto)
  location: CoordinatesDto;
}

export class CreateTripDto {
  @ValidateNested({ each: true })
  @Type(() => ReadingDto)
  readings: ReadingDto[];
}
