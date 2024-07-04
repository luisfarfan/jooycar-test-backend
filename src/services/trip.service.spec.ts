import 'reflect-metadata';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mapTripDocumentToTrip } from '@/mappers/trip.mappers';
import tripsMock from '@/mock/trips.mock';
import { TripDocument } from '@/models/trip.models';
import TripModel from '@/schemas/trip.schema';
import { TripService } from '@/services/trip.service';
import createTripMock from '@/mock/create-trip.mock';
import { CreateTripDto } from '@/dto/create-trip.dto';
import createTripResponseMock from '@/mock/create-trip-response.mock';
import * as utils from '@/utils/utils';

vi.mock('@/utils/utils');
// vi.mock('@/schemas/trip.schema');
describe('TripService', () => {
  let tripService: TripService;

  beforeEach(() => {
    tripService = new TripService();
  });

  afterEach(() => {
    // vi.restoreAllMocks();
  });

  describe('getTrips', () => {
    it('should return all trips', async () => {
      const fakeTrips = tripsMock;
      const mappedFakeTrips = fakeTrips.map((trip) => mapTripDocumentToTrip(trip as TripDocument));
      vi.spyOn(TripModel, 'find').mockReturnValue({
        skip: () => ({
          limit: () => ({
            exec: () => Promise.resolve(fakeTrips),
          }),
        }),
      });

      const trips = await tripService.getTrips({ limit: 10, offset: 0 });
      expect(trips).toEqual(mappedFakeTrips);
    });

    it('should return trips paginated limit 15 and offset 1', async () => {
      const fakeTrips = tripsMock.slice(0, 15);
      const mappedFakeTrips = fakeTrips.map((trip) => mapTripDocumentToTrip(trip as TripDocument));
      vi.spyOn(TripModel, 'find').mockReturnValue({
        skip: () => ({
          limit: () => ({
            exec: () => Promise.resolve(fakeTrips),
          }),
        }),
      });

      const trips = await tripService.getTrips({ limit: 15, offset: 1 });
      expect(trips).toEqual(mappedFakeTrips);
      expect(TripModel.find).toHaveBeenCalledTimes(1);
      expect(trips.length).toBe(15);
    });
  });

  describe('createTrip', () => {
    it('should create a trip', async () => {
      const createTripDto = createTripMock as CreateTripDto;
      const saveMockResponse = tripsMock[0];
      const fakeTrip = mapTripDocumentToTrip(saveMockResponse as TripDocument);

      const getStartAndEndFromReadingsMock = vi.spyOn(utils, 'getStartAndEndFromReadings').mockResolvedValue({
        start: fakeTrip.start,
        end: fakeTrip.end,
        duration: fakeTrip.duration,
      });

      const boundingBoxMock = vi.spyOn(utils, 'mapToBoundingBox').mockReturnValue(fakeTrip.boundingBox);

      const saveMock = vi.spyOn(TripModel.prototype, 'save').mockResolvedValue(saveMockResponse);
      const result = await tripService.createTrip(createTripDto);

      expect(result.start.address).toEqual(fakeTrip.start.address);
      expect(result.end.address).toEqual(fakeTrip.end.address);
      expect(result.duration).toEqual(fakeTrip.duration);
      expect(result.boundingBox.length).toEqual(fakeTrip.boundingBox.length);
      expect(saveMock).toHaveBeenCalledTimes(1);
    });
  });
});
