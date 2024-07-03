import { IsInt, IsOptional } from 'class-validator';

export class TripQueryParamsDto {
  @IsOptional()
  @IsInt({ message: 'start_gte must be an integer' })
  start_gte?: number;

  @IsOptional()
  @IsInt({ message: 'start_lte must be an integer' })
  start_lte?: number;

  @IsOptional()
  @IsInt({ message: 'distance_gte must be an integer' })
  distance_gte?: number;

  @IsInt({ message: 'limit must be an integer' })
  limit!: number;

  @IsInt({ message: 'offset must be an integer' })
  offset!: number;
}
