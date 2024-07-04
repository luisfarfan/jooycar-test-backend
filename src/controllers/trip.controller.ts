import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import TYPES from '@/core/inversify.types';
import { MongooseClient } from '@/core/mongoose';
import { CreateTripDto } from '@/dto/create-trip.dto';
import { TripService } from '@/services/trip.service';

@injectable()
export class TripController {
  constructor(
    @inject(TYPES.TripService) private readonly tripService: TripService,
    @inject(TYPES.MongooseClient) private readonly mongooseClient: MongooseClient
  ) {
    this.mongooseClient.connect().then(() => {
      console.log('Connected to MongoDB');
    });
  }
  public getTrips = async (req: Request, res: Response) => {
    console.log(req.query);
    // const response = await this.tripService.getTrips(req.query);
    res.json([]);
  };

  public createTrip = async (req: Request, res: Response) => {
    const trip = req.body as CreateTripDto[];
    const newTrip = await this.tripService.createTrip(trip);
    res.status(201).json(newTrip);
  };
}
