# @wnodex/cors

> wnodex cors middleware

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides CORS middleware for `wnodex`.

## About

`@wnodex/cors` integrates the `cors` middleware to enable Cross-Origin Resource Sharing (CORS) in your `wnodex` application. It allows you to control which origins can access your API.

## Features

- Enable and configure CORS from the main `wnodex` configuration.
- Fine-grained control over `origin`, `methods`, `allowedHeaders`, and other CORS options.
- Uses the battle-tested `cors` library for Express.

## Why use it?

This package provides a standardized way to manage CORS settings within a `wnodex` project. It helps prevent common cross-origin issues during development and allows you to enforce strict security policies in production, all from one central configuration point.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add @wnodex/cors
```

**npm**

```bash
npm install @wnodex/cors
```

**yarn**

```bash
yarn add @wnodex/cors
```

**bun**

```bash
bun add @wnodex/cors
```

## Usage

`@wnodex/cors` is enabled by default with sensible settings for development. You can customize its behavior by passing a `cors` object to the `Wnodex` constructor.

To disable it, set `cors` to `false`.

```typescript
import { Wnodex } from 'wnodex';

// Example: Customize allowed origins
const server = new Wnodex({
  cors: {
    origin: 'https://my-frontend-app.com',
    methods: ['GET', 'POST'],
  },
});

// Example: Disable CORS
const serverWithDisabledCors = new Wnodex({
  cors: false,
});

server.start();
```

The options object is passed directly to the `cors` library.

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
