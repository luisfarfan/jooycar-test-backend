import { Router } from 'express';

import { TripController } from '@/controllers/trip.controller';
import container from '@/core/inversify.config';
import TYPES from '@/core/inversify.types';

const router: Router = Router();
const tripController = container.get<TripController>(TYPES.TripController);

router.get('/', tripController.getTrips);

router.post('/', tripController.createTrip);

export default router;
