import { type Application } from 'express';

import hpp from 'hpp';

import { parseHppOptions } from './parse-options.js';
import { HppOptionsInput } from './schema.js';

export const configureHpp = (app: Application, config: HppOptionsInput) => {
  const logger = app.get('logger') ?? console;
  const options = parseHppOptions(config);

  if (typeof options === 'boolean') {
    if (!options) {
      logger.info('Hpp disabled');
      return;
    }

    logger.info('Hpp enabled');
    return app.use(hpp());
  }

  logger.info('Hpp enabled');
  return app.use(hpp({ whitelist: [...options] }));
};
