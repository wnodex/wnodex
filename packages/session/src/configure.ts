import type { Application } from 'express';

import session from 'express-session';

import { parseSessionOptions } from './parse-options.js';
import { SessionOptionsInput } from './schema.js';

export const configureSession = (
  app: Application,
  config: SessionOptionsInput
) => {
  const logger = app.get('logger') ?? console;
  const options = parseSessionOptions(config);

  if (typeof options === 'boolean') {
    logger.info('Session disabled');

    return;
  }

  logger.info('Session enabled');
  return app.use(session({ ...options }));
};
