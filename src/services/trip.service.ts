import axios from 'axios';
import { injectable } from 'inversify';

import { Trip } from '@/models/trip.models';

@injectable()
export class TripService {
  async getTrips(query: any) {
    console.log('getTrips');
    try {
      const url = `https://virtserver.swaggerhub.com/CONTABILIDAD/JooycarTest/1.0.0/api/trips/v1?limit=20&offset=0`;
      // const config = { params: query };
      const response = await axios.get(url);
      console.log(response);
      return response.data as Trip[];
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      throw error;
    }
  }

  async createTrip(tripData: any) {
    return tripData;
  }
}
