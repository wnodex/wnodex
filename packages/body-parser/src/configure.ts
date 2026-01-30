import express, { type Application } from 'express';

import { parseBodyParserOptions } from './parse-options.js';
import { BodyParserOptionsInput } from './schema.js';

export const configureRateLimit = (
  app: Application,
  config: BodyParserOptionsInput
) => {
  const logger = app.get('logger') ?? console;
  const options = parseBodyParserOptions(config);

  if (typeof options === 'boolean') {
    if (!options) {
      logger.info('Body-Parsers disabled');
    }

    logger.info('BodyParser enabled');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return;
  }

  logger.info('BodyParser enabled');
  app.use(express.json({ ...options.json }));
  app.use(express.urlencoded({ ...options.urlencoded }));
};
