# @wnodex/compression

> wnodex compression middleware

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides compression middleware for `wnodex`.

## About

`@wnodex/compression` integrates the `compression` middleware into your `wnodex` application. It enables gzip compression to decrease the size of the response body and increase the speed of your web app.

## Features

- Easy to enable or disable through the `wnodex` configuration.
- Uses the standard `compression` Express middleware.
- Improves application performance by reducing response sizes.

## Why use it?

Using this package allows you to manage response compression consistently with other `wnodex` features. It's a simple and effective way to improve your application's performance with minimal configuration.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add @wnodex/compression
```

**npm**

```bash
npm install @wnodex/compression
```

**yarn**

```bash
yarn add @wnodex/compression
```

**bun**

```bash
bun add @wnodex/compression
```

## Usage

`@wnodex/compression` is enabled by default. To change this, you can pass the `compression` option to the `Wnodex` constructor.

```typescript
import { Wnodex } from 'wnodex';

// Example: Disable compression
const server = new Wnodex({
  compression: false,
});

server.start();
```

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
