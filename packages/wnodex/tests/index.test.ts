import { beforeEach, describe, expect, it, vi } from 'vitest';

import supertest from 'supertest';

import { Wnodex } from '../src/index.js';

describe('Wnodex', () => {
  let wnodex: Wnodex;

  beforeEach(() => {
    // To see the logs, uncomment the following line
    // vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should create a new Wnodex instance', () => {
    wnodex = new Wnodex({ port: 3000 });
    expect(wnodex).toBeInstanceOf(Wnodex);
  });

  it('should get the express app instance', () => {
    wnodex = new Wnodex({ port: 3000 });
    const app = wnodex.getApp();
    expect(app).toBeDefined();
  });

  it('should get the config', () => {
    const config = { port: 3001 };
    wnodex = new Wnodex(config);
    const wnodexConfig = wnodex.getConfig();
    expect(wnodexConfig.port).toBe(3001);
  });

  it('should get the logger', () => {
    wnodex = new Wnodex({ port: 3000 });
    const logger = wnodex.getLogger();
    expect(logger).toBeDefined();
  });

  it('should start and shutdown the server', async () => {
    wnodex = new Wnodex({ port: 3002 });
    const logger = wnodex.getLogger();
    const infoSpy = vi.spyOn(logger, 'info');

    await wnodex.start();
    expect(infoSpy).toHaveBeenCalledWith(
      'Server running @ http://localhost:3002'
    );

    await wnodex.shutdown();
    expect(infoSpy).toHaveBeenCalledWith('Shutdown initiated...');
    expect(infoSpy).toHaveBeenCalledWith('Server stopped gracefully.');
  });

  it('should respond to a basic request', async () => {
    wnodex = new Wnodex({ port: 3003 });
    const app = wnodex.getApp();

    app.get('/test', (req, res) => {
      res.status(200).send('OK');
    });

    await wnodex.start();

    const response = await supertest(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
    await wnodex.shutdown();
  });

  it('should not throw when shutdown is called on a non-running server', async () => {
    wnodex = new Wnodex({ port: 3000 });
    const logger = wnodex.getLogger();
    const warnSpy = vi.spyOn(logger, 'warn');

    await wnodex.shutdown();

    expect(warnSpy).toHaveBeenCalledWith('Server not running.');
  });

  it('should call cleanup chores on shutdown', async () => {
    wnodex = new Wnodex({ port: 3004 });
    const chores = vi.fn().mockImplementation(() => Promise.resolve());

    await wnodex.start();
    await wnodex.shutdown(chores);

    expect(chores).toHaveBeenCalled();
  });

  it('should handle errors during cleanup chores', async () => {
    wnodex = new Wnodex({ port: 3005 });
    const logger = wnodex.getLogger();
    const errorSpy = vi.spyOn(logger, 'error');
    const chores = vi.fn().mockRejectedValue(new Error('Cleanup failed'));

    await wnodex.start();
    await wnodex.shutdown(chores);

    expect(chores).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(
      expect.any(Error),
      'Error during cleanup chores'
    );
  });
});
