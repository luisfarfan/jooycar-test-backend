import 'reflect-metadata';

import cors from 'cors';
import express, { Express } from 'express';
import { pino } from 'pino';

import tripRoute from '@/routes/trip.router';

const logger = pino({ name: 'server start' });
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1/trips', tripRoute);

export { app, logger };
