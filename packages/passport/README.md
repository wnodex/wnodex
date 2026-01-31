# @wnodex/passport

> wnodex passport middleware

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package integrates the Passport.js authentication middleware.

## About

`@wnodex/passport` provides a seamless way to integrate Passport.js, the popular authentication middleware for Node.js, into your `wnodex` application. It handles the initialization and session management of Passport.

## Features

- Integrates Passport.js for robust authentication strategies.
- Simple configuration within the `wnodex` server.
- Supports using a custom Passport instance.
- Automatically initializes Passport and its session handling.

## Why use it?

Authentication is a complex part of many applications. This package abstracts the setup process for Passport.js, allowing you to focus on implementing authentication strategies (e.g., local, JWT, OAuth) while keeping the configuration centralized and consistent with the rest of your `wnodex` application.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add @wnodex/passport passport
```

**npm**

```bash
npm install @wnodex/passport passport
```

**yarn**

```bash
yarn add @wnodex/passport passport
```

**bun**

```bash
bun add @wnodex/passport passport
```

You will also need to install the specific Passport strategy you intend to use (e.g., `passport-local`, `passport-jwt`).

## Usage

`@wnodex/passport` is disabled by default. To enable it, set `passport: true` in the `Wnodex` constructor. You can also provide your own pre-configured Passport instance.

```typescript
import { Wnodex } from 'wnodex';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// 1. Configure a Passport strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    // Your user authentication logic here
    if (username === 'admin' && password === 'password') {
      return done(null, { id: 1, username: 'admin' });
    }
    return done(null, false);
  })
);

// 2. Initialize Wnodex with Passport enabled
const server = new Wnodex({
  // You need to enable session and cookie-parser for passport sessions
  cookieParser: { secret: 'your-secret' },
  session: { secret: 'your-session-secret' },
  passport: true, // or pass your custom instance: `passport: passport`
});

const app = server.getApp();

// 3. Use passport routes
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Logged in successfully');
});

server.start();
```

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
