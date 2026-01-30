import { type Application } from 'express';

import cors from 'cors';

import { parseCorsOptions } from './parse-options.js';
import { CorsOptionsInput } from './schema.js';

export const configureCors = (app: Application, config: CorsOptionsInput) => {
  const logger = app.get('logger') ?? console;
  const options = parseCorsOptions(config);

  if (typeof options === 'boolean') {
    if (!options) {
      logger.info('CORS disabled');
      return;
    }

    logger.info('CORS enabled');
    return app.use(cors());
  }

  logger.info('CORS enabled');
  return app.use(cors({ ...options }));
};
