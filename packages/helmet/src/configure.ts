import { type Application } from 'express';

import helmet from 'helmet';

import { parseHelmetOptions } from './parse-options.js';
import { HelmetOptionsInput } from './schema.js';

export const configureHelmet = (
  app: Application,
  config: HelmetOptionsInput
) => {
  const logger = app.get('logger') ?? console;
  const options = parseHelmetOptions(config);

  if (typeof options === 'boolean') {
    if (!options) {
      logger.info('Helmet disabled');
      return;
    }

    logger.info('Helmet enabled');
    return app.use(helmet());
  }

  logger.info('Helmet enabled');
  return app.use(helmet({ ...options }));
};
