import { Application } from 'express';

import cookieParser from 'cookie-parser';

import { parseCookieParserOptions } from './parse-options.js';
import { CookieParserOptionsInput } from './schema.js';

export const configureCookieParser = (
  app: Application,
  config: CookieParserOptionsInput
) => {
  const logger = app.get('logger') ?? console;
  const options = parseCookieParserOptions(config);

  if (typeof options === 'boolean') {
    if (!options) {
      logger.info('Cookie parser disabled');
      return;
    }

    logger.info('Cookie parser enabled');
    return app.use(cookieParser());
  }

  logger.info('Cookie parser enabled');
  return app.use(cookieParser(options.secret, options.options));
};
