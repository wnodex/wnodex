![wnodex banner](./images/gh-banner.webp)

# wnodex

_Web Node Express_: An extensible and robust Express.js server framework designed for effortless customization and rapid deployment with sensible defaults.

`wnodex` is a TypeScript-first framework that wraps Express.js to provide a modern, configuration-driven foundation for building Node.js web servers. It comes with a suite of integrated middlewares for common tasks like security, body parsing, and logging, all manageable from a single configuration object.

## Why use wnodex?

`wnodex` solves the problem of boilerplate and inconsistent configuration in Express.js applications. Instead of manually setting up and managing a dozen different middlewares, `wnodex` provides a cohesive ecosystem where everything is designed to work together. This leads to faster development, cleaner code, and more secure applications by default.

## Features

- **Configuration-Driven**: Centralize your server setup in one object.
- **TypeScript First**: Written entirely in TypeScript for a great developer experience.
- **Extensible**: Composed of modular packages that can be used independently.
- **Sensible Defaults**: Pre-configured with best practices for security and performance.
- **Graceful Shutdown**: Built-in support for safely stopping the server.

## Installation

You can install the main `wnodex` package using your favorite package manager. This will include all the necessary middleware packages.

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

## Example Usage

Here is a basic example of how to set up and run a `wnodex` server.

```typescript
import { Wnodex } from 'wnodex';

// 1. Create a server instance with your configuration
const server = new Wnodex({
  port: process.env.PORT || 3000,
  helmet: true, // Enable Helmet with defaults
  cors: {
    origin: 'https://my-app.com', // Customize CORS
  },
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
  process.exit(1);
});

// 4. Handle graceful shutdown
const gracefulShutdown = async () => {
  await server.shutdown();
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
```

## Packages

`wnodex` is a monorepo that contains several packages. While `wnodex` includes all of them, you can also install them individually if you only need specific functionality.

---

### `@wnodex/body-parser`

> A wnodex middleware that integrates body-parser to handle JSON and URL-encoded request bodies.

This middleware parses incoming request bodies before your handlers, available under the `req.body` property.

**Installation**

```bash
pnpm add @wnodex/body-parser
```

**Usage**

```typescript
const server = new Wnodex({
  bodyParsers: {
    json: { limit: '10mb' },
    urlencoded: { extended: true },
  },
});
```

_Enabled by default._ Set to `false` to disable.

---

### `@wnodex/compression`

> A wnodex middleware that integrates compression to enable gzip compression for responses.

This middleware will attempt to compress response bodies for all requests that traverse through the middleware.

**Installation**

```bash
pnpm add @wnodex/compression
```

**Usage**

```typescript
const server = new Wnodex({
  compression: false, // Example of disabling
});
```

_Enabled by default._

---

### `@wnodex/cookie-parser`

> A wnodex middleware that integrates cookie-parser to parse request cookies.

Parse `Cookie` header and populate `req.cookies` with an object keyed by the cookie names.

**Installation**

```bash
pnpm add @wnodex/cookie-parser
```

**Usage**

```typescript
const server = new Wnodex({
  cookieParser: {
    secret: 'a-strong-secret',
  },
});
```

_Disabled by default._ Set to `true` or provide an options object to enable.

---

### `@wnodex/cors`

> A wnodex middleware that integrates CORS to enable Cross-Origin Resource Sharing.

This middleware enables and configures CORS.

**Installation**

```bash
pnpm add @wnodex/cors
```

**Usage**

```typescript
const server = new Wnodex({
  cors: {
    origin: 'https://my-frontend.com',
    methods: ['GET', 'POST'],
  },
});
```

_Enabled by default._

---

### `@wnodex/errors`

> Provides custom error classes and a centralized error handler for wnodex applications.

This package provides a global error handler and custom error classes (`HttpError`, `ValidationError`, etc.) for consistent error responses.

**Installation**

```bash
pnpm add @wnodex/errors
```

**Usage**
The error handler is automatically registered. You can throw exported errors in your routes.

```typescript
import { HttpError } from '@wnodex/errors';
app.get('/user', (req, res) => {
  throw new HttpError('Not Found', 404);
});
```

---

### `@wnodex/helmet`

> A wnodex middleware that integrates Helmet to secure your application by setting various HTTP headers.

This middleware helps secure your app by setting various HTTP headers.

**Installation**

```bash
pnpm add @wnodex/helmet
```

**Usage**

```typescript
const server = new Wnodex({
  helmet: {
    contentSecurityPolicy: false,
  },
});
```

_Disabled by default._ Set to `true` to enable with defaults.

---

### `@wnodex/hpp`

> A wnodex middleware that integrates hpp to protect against HTTP Parameter Pollution attacks.

This middleware protects against HTTP Parameter Pollution attacks.

**Installation**

```bash
pnpm add @wnodex/hpp
```

**Usage**

```typescript
const server = new Wnodex({
  hpp: ['sort', 'filter'], // Whitelist parameters
});
```

_Enabled by default._ Set to `false` to disable.

---

### `@wnodex/logger`

> A pre-configured Pino logger for wnodex applications with pretty-printing for development.

This package provides a fast, structured logger (`pino`) that is automatically integrated.

**Installation**
This is a core package and comes with `wnodex`.

**Usage**

```typescript
const logger = server.getLogger();
logger.info('Server is running!');
```

---

### `@wnodex/passport`

> A wnodex middleware that integrates Passport.js for authentication.

This middleware integrates the popular Passport.js library for handling authentication.

**Installation**

```bash
pnpm add @wnodex/passport passport
```

**Usage**

```typescript
import passport from 'passport';
// ... configure passport strategies ...
const server = new Wnodex({
  passport: true,
  session: { secret: 'secret' },
  cookieParser: { secret: 'secret' },
});
```

_Disabled by default._ Set to `true` to enable.

---

### `@wnodex/rate-limit`

> A wnodex middleware that integrates express-rate-limit to protect applications from abuse.

This middleware limits repeated requests to your API to prevent brute-force and other attacks.

**Installation**

```bash
pnpm add @wnodex/rate-limit
```

**Usage**

```typescript
const server = new Wnodex({
  rateLimit: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
});
```

_Enabled by default._

---

### `@wnodex/session`

> A wnodex middleware that integrates express-session to create and manage user sessions.

This middleware provides session management capabilities, essential for user authentication.

**Installation**

```bash
pnpm add @wnodex/session
```

**Usage**

```typescript
const server = new Wnodex({
  session: {
    secret: 'a-very-strong-secret',
    resave: false,
    saveUninitialized: false,
  },
  cookieParser: { secret: 'a-secret' },
});
```

_Disabled by default._ You must provide a `secret` to enable it.

---

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
