# @wnodex/hpp

> wnodex hpp middleware

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides middleware to protect against HTTP Parameter Pollution attacks.

## About

`@wnodex/hpp` integrates the `hpp` middleware into your `wnodex` application. It helps prevent attackers from manipulating query parameters to bypass security checks or cause unexpected behavior.

## Features

- Protects against HTTP Parameter Pollution (HPP) attacks.
- Easy to enable and configure within `wnodex`.
- Allows whitelisting of parameters that can appear multiple times.
- Built on the `hpp` library.

## Why use it?

Security requires a layered approach, and protecting against parameter pollution is one important layer. This package makes it trivial to add this protection to your `wnodex` application, with a simple and centralized configuration.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add @wnodex/hpp
```

**npm**

```bash
npm install @wnodex/hpp
```

**yarn**

```bash
yarn add @wnodex/hpp
```

**bun**

```bash
bun add @wnodex/hpp
```

## Usage

`@wnodex/hpp` is enabled by default. You can customize it by providing a whitelist of parameters or disable it entirely.

```typescript
import { Wnodex } from 'wnodex';

// Example: Provide a whitelist for specific parameters
const server = new Wnodex({
  hpp: ['sort', 'filter'], // Allow 'sort' and 'filter' to appear multiple times
});

// Example: Disable HPP
const serverWithoutHpp = new Wnodex({
  hpp: false,
});

server.start();
```

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
