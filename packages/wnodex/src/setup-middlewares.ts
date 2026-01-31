import { Application } from 'express';

import { configureBodyParsers } from '@wnodex/body-parser';
import { configureCompression } from '@wnodex/compression';
import { configureCookieParser } from '@wnodex/cookie-parser';
import { configureCors } from '@wnodex/cors';
import { errorHandler } from '@wnodex/errors';
import { configureHelmet } from '@wnodex/helmet';
import { configureHpp } from '@wnodex/hpp';
import { configurePassport } from '@wnodex/passport';
import { configureRateLimit } from '@wnodex/rate-limit';
import { configureSession } from '@wnodex/session';

import { WnodexConfigOutput } from './config.js';

export const setupMiddlewares = (
  app: Application,
  config: WnodexConfigOutput
): void => {
  // Helmet
  configureHelmet(app, config.helmet);

  // CORS
  configureCors(app, config.cors);

  // Body Parsers
  configureBodyParsers(app, config.bodyParsers);

  // cookie-parser
  configureCookieParser(app, config.cookieParser);

  // compression
  configureCompression(app, config.compression);

  // express-rate-limit
  configureRateLimit(app, config.rateLimit);

  // hpp
  configureHpp(app, config.hpp);

  // express-session - Session management
  configureSession(app, config.session);

  // passport - Authentication middleware
  configurePassport(app, config.passport);

  // Error Handler (keep it last)
  app.use(errorHandler);
};
