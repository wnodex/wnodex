import type { NextFunction, Request, Response } from 'express';

import { HttpError } from './http-error.js';

export const errorHandler = (
  err: HttpError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log the error for server debugging
  console.error(err);

  // Determine HTTP status code; default to 500 if unavailable
  const statusCode =
    typeof err === 'object' && err !== null && 'statusCode' in err
      ? err.statusCode
      : 500;

  // Get message or default to 'Internal Server Error'
  const message =
    typeof err === 'object' && err !== null && 'message' in err
      ? err.message
      : 'Internal Server Error';

  // Send JSON response
  res.status(statusCode).json({
    error: {
      message,
      // Show stack trace only in development environment
      ...(process.env.NODE_ENV !== 'production' && {
        stack: err.stack,
      }),
    },
  });
};
