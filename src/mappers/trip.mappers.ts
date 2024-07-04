import { Trip, TripDocument } from '@/models/trip.models';

export const mapTripDocumentToTrip = (doc: TripDocument): Trip => {
  return {
    id: doc.id,
    start: {
      time: doc.start_time,
      lat: doc.start_lat,
      lon: doc.start_lon,
      address: doc.start_address,
    },
    end: {
      time: doc.end_time,
      lat: doc.end_lat,
      lon: doc.end_lon,
      address: doc.end_address,
    },
    distance: doc.distance,
    duration: doc.duration,
    overspeedsCount: doc.overspeedsCount,
    boundingBox: doc.boundingBox,
  };
};
