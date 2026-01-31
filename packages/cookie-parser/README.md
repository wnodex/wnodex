# @wnodex/cookie-parser

> wnodex cookie-parser middleware

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides cookie-parser middleware for `wnodex`.

## About

`@wnodex/cookie-parser` integrates the `cookie-parser` middleware into your `wnodex` application. It provides a simple way to parse `Cookie` header and populate `req.cookies` with an object keyed by the cookie names.

## Features

- Seamless integration with the `wnodex` server.
- Parses cookies and supports signed cookies.
- Configurable via the main `wnodex` configuration object.
- Built on the standard `cookie-parser` library.

## Why use it?

This package is the standard way to handle cookies within a `wnodex` application. It centralizes cookie parsing configuration, making it easy to manage alongside other server settings, especially when dealing with signed cookies for security.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add @wnodex/cookie-parser
```

**npm**

```bash
npm install @wnodex/cookie-parser
```

**yarn**

```bash
yarn add @wnodex/cookie-parser
```

**bun**

```bash
bun add @wnodex/cookie-parser
```

## Usage

`@wnodex/cookie-parser` is disabled by default. To enable it, provide a configuration object to the `cookieParser` property in the `Wnodex` constructor, or set it to `true`.

```typescript
import { Wnodex } from 'wnodex';

// Example: Enable with a secret for signed cookies
const server = new Wnodex({
  cookieParser: {
    secret: 'your-secret-key',
  },
});

// Example: Enable without a secret
const serverSimple = new Wnodex({
  cookieParser: true,
});

server.start();
```

The `secret` can be a string or an array of strings. You can also provide `options` that are passed directly to `cookie-parser`.

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
