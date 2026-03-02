# @wnodex/react-router

> wnodex react-router middleware

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides React Router SSR and static assets integration for `wnodex`.

## About

`@wnodex/react-router` handles the serving of static assets and the SSR integration for React Router v7+ within a `wnodex` application.

## Features

- Easy integration of React Router SSR.
- Optimized static asset serving.
- Built-in support for React Router v7+ request handlers.

## Installation

```bash
pnpm add @wnodex/react-router @react-router/express
```

## Usage

```typescript
import { ReactRouterSSR, StaticAssets } from '@wnodex/react-router';
import { Wnodex } from 'wnodex';
import path from 'node:path';

const server = new Wnodex({ port: 3000 });
const app = server.getApp();

const clientRoot = path.resolve('build/client');

StaticAssets.register(app, clientRoot);
await ReactRouterSSR.register(app, clientRoot);

server.start();
```

## License

This project is licensed under the MIT License.
