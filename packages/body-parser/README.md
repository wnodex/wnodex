# @wnodex/body-parser

> wnodex body-parser middleware

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides body-parser middleware for `wnodex`.

## About

`@wnodex/body-parser` is a middleware for `wnodex` that integrates the `body-parser` library to handle JSON and URL-encoded request bodies. It allows you to configure body parsing behavior through the main `wnodex` configuration.

## Features

- Seamless integration with the `wnodex` server.
- Parses incoming request bodies in a middleware before your handlers.
- Supports both JSON and URL-encoded bodies.
- Configuration is centralized in the `wnodex` constructor.
- Based on the widely-used `body-parser` library.

## Why use it?

This package simplifies request body parsing in your `wnodex` application. By integrating with the `wnodex` configuration system, it provides a consistent and streamlined way to manage middleware settings, abstracting away the boilerplate of setting up `body-parser` manually.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add @wnodex/body-parser
```

**npm**

```bash
npm install @wnodex/body-parser
```

**yarn**

```bash
yarn add @wnodex/body-parser
```

**bun**

```bash
bun add @wnodex/body-parser
```

## Usage

`@wnodex/body-parser` is enabled by default in `wnodex`. You can customize its behavior by passing a `bodyParsers` object to the `Wnodex` constructor.

To disable it, set `bodyParsers` to `false`.

```typescript
import { Wnodex } from 'wnodex';

// Example: Enable with custom options
const server = new Wnodex({
  bodyParsers: {
    json: { limit: '10mb' },
    urlencoded: { extended: true },
  },
});

// Example: Disable body-parser
const serverWithDisabledBodyParser = new Wnodex({
  bodyParsers: false,
});

server.start();
```

The options for `json` and `urlencoded` are passed directly to the `body-parser` library.

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
