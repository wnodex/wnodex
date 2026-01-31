# @wnodex/session

> wnodex session middleware

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides session management middleware.

## About

`@wnodex/session` integrates `express-session` to create and manage user sessions in your `wnodex` application. It is a crucial component for tracking user state, especially for authentication.

## Features

- Manages user sessions with cookies.
- Highly configurable, including cookie options, secret, and store.
- Seamlessly integrates with `@wnodex/passport`.
- Centralized configuration within the `Wnodex` constructor.

## Why use it?

Session management is fundamental for any application that needs to maintain state across requests, such as user logins. This package provides a robust session solution powered by `express-session` while maintaining the simple, centralized configuration philosophy of `wnodex`.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add @wnodex/session
```

**npm**

```bash
npm install @wnodex/session
```

**yarn**

```bash
yarn add @wnodex/session
```

**bun**

```bash
bun add @wnodex/session
```

## Usage

`@wnodex/session` is disabled by default. To enable it, you must provide a configuration object with at least a `secret`.

```typescript
import { Wnodex } from 'wnodex';

// Example: Enable session management
const server = new Wnodex({
  // cookie-parser is often used with sessions
  cookieParser: { secret: 'cookie-secret' },
  session: {
    secret: 'your-super-secret-key-for-sessions',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000, // 24 hours
    },
  },
});

server.start();
```

The options object is passed directly to the `express-session` library. For production use, it is highly recommended to use a custom session store like `connect-redis` or `connect-mongo`.

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
