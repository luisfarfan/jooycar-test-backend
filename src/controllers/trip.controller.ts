import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '@/core/inversify.types';
import { TripService } from '@/services/trip.service';
import { CreateTripDto } from '@/dto/create-trip.dto';

@injectable()
export class TripController {
  constructor(@inject(TYPES.TripService) private readonly tripService: TripService) {}
  public getTrips = async (req: Request, res: Response) => {
    console.log(req.query);
    const response = await this.tripService.getTrips(req.query);
    res.json(response.trips);
  };

  public createTrip = async (req: Request, res: Response) => {
    const trip = req.body as CreateTripDto[];
    const newTrip = await this.tripService.createTrip(trip);
    res.status(201).json(newTrip);
  };
}
