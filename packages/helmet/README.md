# @wnodex/helmet

> wnodex helmet middleware

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides security-focused middleware using Helmet.

## About

`@wnodex/helmet` integrates the `helmet` middleware to help secure your `wnodex` application by setting various HTTP headers. It provides sensible defaults to protect against common web vulnerabilities.

## Features

- Simple integration with `wnodex`.
- Sets important security headers like `Content-Security-Policy`, `Strict-Transport-Security`, and more.
- Configurable to disable or customize specific headers.
- Based on the popular `helmet` library.

## Why use it?

Security is a primary concern for any web application. `@wnodex/helmet` makes it easy to apply a baseline of security measures with zero configuration. By managing it within `wnodex`, you ensure that security headers are applied consistently across your application.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add @wnodex/helmet
```

**npm**

```bash
npm install @wnodex/helmet
```

**yarn**

```bash
yarn add @wnodex/helmet
```

**bun**

```bash
bun add @wnodex/helmet
```

## Usage

`@wnodex/helmet` is disabled by default. To enable it with default settings, set `helmet: true`. You can also pass a configuration object to customize its behavior.

```typescript
import { Wnodex } from 'wnodex';

// Example: Enable Helmet with default settings
const server = new Wnodex({
  helmet: true,
});

// Example: Customize Helmet options
const serverWithCustomHelmet = new Wnodex({
  helmet: {
    contentSecurityPolicy: false, // Disable a specific middleware
  },
});

server.start();
```

The options object is passed directly to the `helmet` library.

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
