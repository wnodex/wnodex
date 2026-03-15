# @wnodex/build

> wnodex build utilities

Part of the [wnodex](https://github.com/wnodex/wnodex) ecosystem, this package provides build tools and asset syncing functions for wnodex applications.

## About

`@wnodex/build` encapsulates building Node.js applications with esbuild, syncing client assets, and generating production-ready `package.json` files.

## Features

- Unified build script wrapper.
- Merged asset synchronization and package generation logic.
- Robust error handling (throws if paths are missing).
- **CLI access** via `wnodex-build`.

## Usage

### 1. In `package.json` scripts

You can run the build tools directly via the CLI:

```json
{
  "scripts": {
    "build": "wnodex-build"
  }
}
```

### 2. Programmatic usage

Import the `runBuildTasks` function directly in your TypeScript scripts:

```typescript
import { runBuildTasks, build } from '@wnodex/build';

// Run the full build pipeline (Sync + Esbuild + Generate)
await build();

// Or run ONLY the merged tasks (Sync + Generate)
await runBuildTasks({
  clientDir: '../www',
  clientDistDir: 'build',
  destination: 'www',
  internalPrefixes: ['@repo'],
  outputDistDir: 'dist',
});
```

## Configuration

The package accepts configuration via the `buildConfig` property in your `package.json`.

```json
{
  "buildConfig": {
    "clientDir": "../www",
    "clientDistDir": "build",
    "destination": "www",
    "name": "application",
    "internalPrefixes": ["@repo"],
    "main": "./main.js",
    "outputDistDir": "dist"
  }
}
```

### Available Properties

- **`clientDir`**: Path to the client project directory.
- **`clientDistDir`**: Name of the distribution directory (e.g., "dist" or "build").
- **`destination`**: Path where assets should be synced.
- **`buildCommand`**: (Optional) Command to run if the dist directory is missing.
- **`name`**: (Optional) Production package name. Defaults to the source's name.
- **`packagePaths`**: (Optional) Array of paths to `package.json` files. Defaults to `['.', clientDir]`.
- **`internalPrefixes`**: Array of dependency name prefixes to filter out (e.g., workspace packages).
- **`outputDistDir`**: (Optional) Output directory. Defaults to `dist`.
- **`main`**: (Optional) Entry point file. Defaults to `./main.js`.
- **`version`**, **`type`**, **`author`**, **`license`**: (Optional) Override metadata for the generated package.

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
