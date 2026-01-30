import { type Application } from 'express';

import passport from 'passport';

import { parsePassportOptions } from './parse-options.js';
import { PassportOptionsInput } from './schema.js';

export const configurePassport = (
  app: Application,
  config: PassportOptionsInput
) => {
  const logger = app.get('logger') ?? console;
  const options = parsePassportOptions(config);

  if (typeof options === 'boolean' && !options) {
    logger.info('Passport disabled');
    return;
  }

  const pssprt = typeof options === 'boolean' ? passport : options;

  logger.info('Passport enabled');
  app.set('passport', pssprt);
  app.use(pssprt.initialize());
  app.use(pssprt.session());

  return pssprt;
};
