export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  TRACE: 'trace',
} as const;

import pretty from 'pino-pretty';

import pino from 'pino';

const prettyStream = pretty({
  colorize: true,
  levelFirst: true,
  translateTime: true,
  ignore: 'pid,hostname',
  singleLine: true,
});

const baseOptions = {
  level: LOG_LEVELS.INFO,
};

export const logger =
  process.env.NODE_ENV === 'production'
    ? pino(baseOptions)
    : pino(baseOptions, prettyStream);
