import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '@/core/inversify.types';
import { CreateTripDto } from '@/dto/create-trip.dto';
import { TripQueryParamsDto } from '@/dto/trip-query-params.dto';
import { TripService } from '@/services/trip.service';

@injectable()
export class TripController {
  constructor(@inject(TYPES.TripService) private readonly tripService: TripService) {}
  public getTrips = async (req: Request, res: Response) => {
    const response = await this.tripService.getTrips(req.query as TripQueryParamsDto);
    res.json(response);
  };

  public createTrip = async (req: Request, res: Response) => {
    const trip = req.body as CreateTripDto;
    const newTrip = await this.tripService.createTrip(trip);
    res.status(201).json(newTrip);
  };

  public createInitTripsData = async (req: Request, res: Response) => {
    await this.tripService.createInitTripsData();
    res.status(201).json({ message: 'Initial trips data' });
  };
}
