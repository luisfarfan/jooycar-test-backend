import { Container } from 'inversify';

import { TripController } from '@/controllers/trip.controller';
import TYPES from '@/core/inversify.types';
import { MongooseClient } from '@/core/mongoose';
import { TripService } from '@/services/trip.service';

const container = new Container();
container.bind<TripService>(TYPES.TripService).to(TripService);
container.bind<TripController>(TYPES.TripController).to(TripController);

container.bind<MongooseClient>(TYPES.MongooseClient).to(MongooseClient);

export default container;
