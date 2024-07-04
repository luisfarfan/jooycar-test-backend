import 'reflect-metadata';

import * as process from 'process';

import container from '@/core/inversify.config';
import TYPES from '@/core/inversify.types';
import { MongooseClient } from '@/core/mongoose';
import { app, logger } from '@/server';

const mongooseClient = container.get<MongooseClient>(TYPES.MongooseClient);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, async () => {
  logger.info(`Server  running on port http://localhost:${PORT}`);
  await mongooseClient.connect();
});

const onCloseSignal = async () => {
  logger.info('sigint received, shutting down');
  await mongooseClient.getInstance().disconnect?.();
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
