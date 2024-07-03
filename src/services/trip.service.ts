import axios from 'axios';
import { injectable } from 'inversify';
import * as process from 'process';

import { TripResponse } from '@/models/trip.models';

@injectable()
export class TripService {
  async getTrips(query: any) {
    try {
      const url = `${process.env.JOOYCAR_API_URL}`;
      const config = { params: query };
      const response = await axios.get(url, config);
      return response.data as TripResponse[];
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      throw error;
    }
  }

  async createTrip(tripData: any) {
    return tripData;
  }
}
