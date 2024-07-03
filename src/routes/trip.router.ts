import { Router } from 'express';

import { TripController } from '@/controllers/trip.controller';
import { validateQueryDto } from '@/core/dto-validation';
import container from '@/core/inversify.config';
import TYPES from '@/core/inversify.types';
import { TripQueryParamsDto } from '@/dto/trip-query-params.dto';

const router: Router = Router();
const tripController = container.get<TripController>(TYPES.TripController);

router.get('/', validateQueryDto(TripQueryParamsDto), tripController.getTrips);

router.post('/', tripController.createTrip);

export default router;
