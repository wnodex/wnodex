# @wnodex/errors

> wnodex custom application errors

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides custom error classes and a centralized error handler.

## About

`@wnodex/errors` provides a structured approach to error handling in `wnodex` applications. It includes a set of custom error classes (`HttpError`, `ConfigError`, `ValidationError`) and a global error handling middleware that ensures consistent, predictable error responses.

## Features

- **`errorHandler` middleware**: A global error handler that catches exceptions and sends formatted JSON error responses.
- **`HttpError` class**: For creating errors with a specific HTTP status code.
- **`BaseError` class**: A base for creating custom, structured errors with codes and context.
- **`ValidationError` & `ConfigError`**: Specialized error classes for common application failure scenarios.
- Hides stack traces in production for security.

## Why use it?

Structured error handling is crucial for building robust APIs. This package enforces a consistent error response format, making it easier for clients to handle errors. By using custom error classes, your application code becomes more expressive and easier todebug. The global handler prevents unhandled exceptions from crashing the server.

## Installation

You can install the package using your favorite package manager:

**pnpm**

```bash
pnpm add @wnodex/errors
```

**npm**

```bash
npm install @wnodex/errors
```

**yarn**

```bash
yarn add @wnodex/errors
```

**bun**

```bash
bun add @wnodex/errors
```

## Usage

The `errorHandler` middleware is automatically registered as the last middleware by `wnodex`, so there is no need to configure it. You can use the exported error classes throughout your application.

```typescript
import { Wnodex } from 'wnodex';
import { HttpError } from '@wnodex/errors';

const server = new Wnodex({
  port: 3000,
});

const app = server.getApp();

app.get('/users/:id', (req, res) => {
  if (req.params.id === '0') {
    throw new HttpError('User not found', 404);
  }
  res.send({ id: req.params.id, name: 'John Doe' });
});

server.start();

// Request to /users/0 will result in a 404 response:
// {
//   "error": {
//     "message": "User not found"
//   }
// }
```

### Custom Error Classes

- **`HttpError(message, statusCode)`**: Throws an error that results in a specific HTTP status.
- **`ValidationError(message, cause, context)`**: For data validation failures.
- **`ConfigError(message, cause, context)`**: For application configuration issues.

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
