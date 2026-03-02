import path from 'node:path';

import express, { type Application } from 'express';

/**
 * Utility for registering static asset middleware in an Express application.
 */
export const StaticAssets = {
  /**
   * Registers static file serving middleware for assets and client root.
   * @param app - The express application instance.
   * @param clientRoot - The root directory of the client build (containing the 'static' folder).
   */
  register(app: Application, clientRoot: string): void {
    const staticDir = path.join(clientRoot, 'static');

    app.use(
      '/static',
      express.static(staticDir, {
        immutable: true,
        maxAge: '1y',
        fallthrough: false,
      })
    );

    app.use(
      express.static(clientRoot, {
        maxAge: '1h',
      })
    );
  },
};
