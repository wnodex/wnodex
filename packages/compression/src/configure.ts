import { type Application } from 'express';

import compression from 'compression';

import { parseCompressionOptions } from './parse-options.js';
import { CompressionOptionsInput } from './schema.js';

export const configureCompression = (
  app: Application,
  config: CompressionOptionsInput
) => {
  const logger = app.get('logger') ?? console;
  const options = parseCompressionOptions(config);

  if (!options) {
    logger.info('Compression is disabled');
    return;
  }

  logger.info('Compression is enabled');

  app.use(compression());
};
