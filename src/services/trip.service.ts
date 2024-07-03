import axios from 'axios';
import { injectable } from 'inversify';
import * as process from 'process';

import { TripResponse } from '@/models/trip.models';
import { CreateTripDto } from '@/dto/create-trip.dto';

@injectable()
export class TripService {
  protected readonly baseUrl = 'https://virtserver.swaggerhub.com/CONTABILIDAD/JooycarTest/1.0.0/api/trips/v1';
  async getTrips(query: any) {
    try {
      const config = { params: query };
      const response = await axios.get(this.baseUrl, config);
      return response.data as TripResponse;
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      throw error;
    }
  }

  async createTrip(tripData: CreateTripDto[]) {
    return tripData;
  }
}
