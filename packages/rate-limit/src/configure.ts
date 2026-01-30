import { type Application } from 'express';

import rateLimit from 'express-rate-limit';

import { parseRateLimitOptions } from './parse-options.js';
import { RateLimitOptionsInput } from './schema.js';

export const configureRateLimit = (
  app: Application,
  config: RateLimitOptionsInput
) => {
  const logger = app.get('logger') ?? console;
  const options = parseRateLimitOptions(config);

  if (typeof options === 'boolean') {
    if (!options) {
      logger.info('Rate-limit disabled');
      return;
    }

    logger.info('Rate-limit enabled');
    return app.use(rateLimit());
  }

  logger.info('Rate-limit enabled');
  return app.use(rateLimit({ ...options }));
};
