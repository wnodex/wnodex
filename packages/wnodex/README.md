# wnodex

> Web Node Express: an extensible and robust express.js server class designed for effortless customization and rapid deployment.

`wnodex` is a TypeScript-first framework that wraps Express.js to provide a modern, configuration-driven, and extensible foundation for building Node.js web servers. It comes with a suite of integrated middlewares for common tasks like security, body parsing, and logging, all manageable from a single configuration object.

## Features

- **Configuration-Driven**: Centralize your server setup in one object.
- **TypeScript First**: Written entirely in TypeScript for a great developer experience.
- **Extensible**: Composed of modular packages that can be used independently.
- **Sensible Defaults**: Pre-configured with best practices for security and performance.
- **Graceful Shutdown**: Built-in support for safely stopping the server.
- **Integrated Tooling**: Includes middlewares for:
  - Security headers (`@wnodex/helmet`)
  - Cross-Origin Resource Sharing (`@wnodex/cors`)
  - Body and cookie parsing (`@wnodex/body-parser`, `@wnodex/cookie-parser`)
  - Response compression (`@wnodex/compression`)
  - Rate limiting (`@wnodex/rate-limit`)
  - Parameter pollution protection (`@wnodex/hpp`)
  - Session management (`@wnodex/session`)
  - Authentication (`@wnodex/passport`)
  - Structured logging (`@wnodex/logger`)
  - Centralized error handling (`@wnodex/errors`)

## Why use it?

`wnodex` solves the problem of boilerplate and inconsistent configuration in Express.js applications. Instead of manually setting up and managing a dozen different middlewares, `wnodex` provides a cohesive ecosystem where everything is designed to work together. This leads to faster development, cleaner code, and more secure applications by default.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add wnodex
```

**npm**

```bash
npm install wnodex
```

**yarn**

```bash
yarn add wnodex
```

**bun**

```bash
bun add wnodex
```

## Usage

Create a new `Wnodex` instance, passing your configuration to the constructor. Then, call the `start()` method.

```typescript
import { Wnodex } from 'wnodex';

// 1. Create a server instance with your configuration
const server = new Wnodex({
  port: process.env.PORT || 3000,
  helmet: true,
  cors: {
    origin: 'https://my-app.com',
  },
  session: {
    secret: 'my-session-secret',
    resave: false,
    saveUninitialized: false,
  },
  passport: true,
});

// 2. Get the underlying Express app to define routes
const app = server.getApp();

app.get('/', (req, res) => {
  res.send('Hello from wnodex!');
});

// 3. Start the server
server.start().catch((err) => {
  const logger = server.getLogger();
  logger.error(err, 'Failed to start server');
});

// Handle graceful shutdown on OS signals
const gracefulShutdown = async () => {
  await server.shutdown();
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
```

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
