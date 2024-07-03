import * as process from 'process';

import { app, logger } from '@/server';

const server = app.listen(3000, () => {
  logger.info(`Server  running on port http://localhost:3000`);
});

const onCloseSignal = () => {
  logger.info('sigint received, shutting down');
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
