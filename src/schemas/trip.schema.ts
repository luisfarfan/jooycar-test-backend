import { Model, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Coordinates, TripDocument } from '@/models/trip.models';

const CoordinatesSchema = new Schema<Coordinates>({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
});

type TripModel = Model<TripDocument, NonNullable<unknown>>;

const tripSchema = new Schema<TripDocument>({
  id: { type: String, default: uuidv4, unique: true },
  start_time: { type: Number, required: true },
  start_lat: { type: Number, required: true },
  start_lon: { type: Number, required: true },
  start_address: { type: String, required: true },
  end_time: { type: Number, required: true },
  end_lat: { type: Number, required: true },
  end_lon: { type: Number, required: true },
  end_address: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: Number, required: true },
  overspeedsCount: { type: Number, required: true },
  boundingBox: { type: [CoordinatesSchema], required: true },
});

const TripModel = model<TripDocument, TripModel>('Trip', tripSchema);

export default TripModel;
