import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class TripQueryParamsDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'start_gte must be an integer' })
  start_gte?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'start_lte must be an integer' })
  start_lte?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'distance_gte must be an integer' })
  distance_gte?: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'limit must be an integer' })
  limit!: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'offset must be an integer' })
  offset!: number;
}
