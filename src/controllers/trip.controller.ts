import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '@/core/inversify.types';
import { TripService } from '@/services/trip.service';

@injectable()
export class TripController {
  constructor(@inject(TYPES.TripService) private readonly tripService: TripService) {}
  public getTrips = async (req: Request, res: Response) => {
    const trips = await this.tripService.getTrips({});
    res.json(trips);
  };

  public createTrip = async (req: Request, res: Response) => {
    const trip = req.body;
    const newTrip = await this.tripService.createTrip(trip);
    res.status(201).json(newTrip);
  };
}
