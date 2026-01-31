# @wnodex/rate-limit

> wnodex rate-limit middleware

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides rate limiting middleware to protect your application from abuse.

## About

`@wnodex/rate-limit` integrates `express-rate-limit` to limit repeated requests to public APIs and/or endpoints such as password reset. It helps prevent brute-force attacks and denial-of-service attacks.

## Features

- Easy to configure rate limiting for all routes.
- Sensible defaults for immediate protection.
- Fully customizable window, limit, and message.
- Integrated into the central `wnodex` configuration.

## Why use it?

Protecting your application from excessive requests is essential for maintaining service availability and security. This package offers a simple, configuration-driven way to apply rate limiting, using a widely trusted library, without cluttering your application code.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add @wnodex/rate-limit
```

**npm**

```bash
npm install @wnodex/rate-limit
```

**yarn**

```bash
yarn add @wnodex/rate-limit
```

**bun**

```bash
bun add @wnodex/rate-limit
```

## Usage

`@wnodex/rate-limit` is enabled by default with a limit of 100 requests per 15 minutes. You can customize these settings or disable it entirely.

```typescript
import { Wnodex } from 'wnodex';

// Example: Customize rate limit settings
const server = new Wnodex({
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 requests per minute
    message: 'Too many requests from this IP, please try again after a minute',
  },
});

// Example: Disable rate limiting
const serverWithoutRateLimit = new Wnodex({
  rateLimit: false,
});

server.start();
```

The options object is passed directly to the `express-rate-limit` library.

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
