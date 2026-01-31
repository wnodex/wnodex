# @wnodex/logger

> wnodex logger

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides a pre-configured logger for `wnodex` applications.

## About

`@wnodex/logger` provides a singleton logger instance powered by `pino`, a fast and low-overhead logger. It is configured to output pretty, human-readable logs during development and efficient JSON logs in production.

## Features

- High-performance logging with `pino`.
- **Pretty printing**: Colorized, single-line logs in development via `pino-pretty`.
- **JSON logs**: Structured, machine-readable logs in production.
- Automatically integrated into the `wnodex` application instance.

## Why use it?

Consistent and structured logging is essential for monitoring and debugging applications. `@wnodex/logger` provides a production-ready logging setup out of the box, with zero configuration required. The logger instance is automatically available throughout your `wnodex` application.

## Installation

This package is a core dependency of `wnodex` and does not need to be installed separately.

## Usage

The logger is automatically initialized and attached to the `wnodex` instance. You can access it via the `getLogger()` method or from the Express `app` object.

```typescript
import { Wnodex } from 'wnodex';

const server = new Wnodex({ port: 3000 });
const logger = server.getLogger();
const app = server.getApp();

logger.info('Server is starting...');

app.get('/', (req, res) => {
  const appLogger = req.app.get('logger');
  appLogger.info('Received a request on /');
  res.send('Hello World!');
});

server.start();
```

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
