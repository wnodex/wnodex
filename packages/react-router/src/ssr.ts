import path from 'node:path';
import { pathToFileURL } from 'node:url';

import type { Application, NextFunction, Request, Response } from 'express';

import { createRequestHandler } from '@react-router/express';

/**
 * Handles React Router SSR integration within an Express application.
 */
export const ReactRouterSSR = {
  /**
   * Registers the React Router SSR handler for all requests.
   * @param app - The express application instance.
   * @param clientPath - The base path of the client build (containing the 'server' folder).
   */
  async register(app: Application, clientPath: string): Promise<void> {
    let reactRouterHandler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => void | Promise<void>;

    try {
      const buildPath = path.join(clientPath, 'server', 'index.js');
      const build = await import(pathToFileURL(buildPath).href);

      reactRouterHandler = createRequestHandler({ build });
    } catch (error) {
      console.error('❌ Failed to load React Router build:', error);
      reactRouterHandler = (_req: Request, res: Response) => {
        res.status(500).send('Internal Server Error: SSR build not found');
      };
    }

    app.all('*splat', reactRouterHandler);
  },
};
