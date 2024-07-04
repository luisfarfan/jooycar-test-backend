import { injectable } from 'inversify';
import { FilterQuery } from 'mongoose';

import { CreateTripDto } from '@/dto/create-trip.dto';
import { TripQueryParamsDto } from '@/dto/trip-query-params.dto';
import { mapTripDocumentToTrip } from '@/mappers/trip.mappers';
import TripModel from '@/schemas/trip.schema';
import {
  calculateDistanceByReadings,
  calculateOverSpeedsCount,
  getStartAndEndFromReadings,
  mapToBoundingBox,
} from '@/utils/utils';

@injectable()
export class TripService {
  async getTrips(query: TripQueryParamsDto) {
    const filters = this.createFilterQuery(query);
    const trips = await TripModel.find(filters.filters).skip(filters.offset).limit(filters.limit).exec();
    return trips.map((trip) => mapTripDocumentToTrip(trip));
  }

  private createFilterQuery(query: TripQueryParamsDto) {
    const { start_gte, start_lte, distance_gte, limit = 10, offset = 0 } = query;

    const filters: FilterQuery<any> = {};

    if (start_gte) {
      filters.start_time = { $gte: Number(start_gte) };
    }

    if (start_lte) {
      if (!filters.start_time) {
        filters.start_time = {};
      }
      filters.start_time.$lte = Number(start_lte);
    }

    if (distance_gte) {
      filters.distance = { $gte: Number(distance_gte) };
    }

    return { filters, limit, offset };
  }

  async createTrip(tripData: CreateTripDto) {
    const readings = tripData.readings;
    const { start, end, duration } = await getStartAndEndFromReadings(readings);
    const distance = calculateDistanceByReadings(readings);
    const boundingBox = mapToBoundingBox(readings);
    const overspeedsCount = calculateOverSpeedsCount(readings);
    const trip = new TripModel({
      start_time: start.time,
      start_lat: start.lat,
      start_lon: start.lon,
      start_address: start.address,
      end_time: end.time,
      end_lat: end.lat,
      end_lon: end.lon,
      end_address: end.address,
      distance,
      duration,
      overspeedsCount,
      boundingBox,
    });
    await trip.save();
    return mapTripDocumentToTrip(trip);
  }
}
