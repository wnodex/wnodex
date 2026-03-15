/**
 * @file build.ts
 * @description Unified build script orchestrator.
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import * as esbuild from 'esbuild';

import { type BuildConfig, runBuildTasks } from './tasks.js';

/**
 * Loads configuration from package.json.
 */
function getPackageConfig(): BuildConfig | undefined {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  if (!existsSync(pkgPath)) return;

  try {
    const content = readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    return pkg.buildConfig;
  } catch {
    return;
  }
}

/**
 * Main build process.
 */
export async function build(): Promise<void> {
  const config = getPackageConfig();

  // 1. Run merged tasks (Sync & Generation)
  if (config) {
    await runBuildTasks(config);
  } else {
    console.warn('⚠️ No buildConfig found in package.json, skipping tasks.');
  }

  // 2. Build with esbuild
  console.log('🏗️ Starting esbuild...');
  /** @type {esbuild.BuildOptions} */
  const esbuildConfig: esbuild.BuildOptions = {
    entryPoints: ['src/main.ts'],
    bundle: true,
    platform: 'node',
    target: 'node22',
    format: 'esm',
    outfile: 'dist/main.js',
    sourcemap: true,
    minify: false,
    external: [
      'express',
      'wnodex',
      'pino',
      'pino-pretty',
      'sync-directory',
      '@wnodex/react-router',
      'zod',
      'passport',
      'helmet',
      'cors',
      'compression',
      'cookie-parser',
      'express-session',
      'express-rate-limit',
      'hpp',
      'pino-http',
      'resvg',
      '@resvg/resvg-js',
    ],
    loader: {
      '.ts': 'ts',
    },
    plugins: [
      {
        name: 'make-all-packages-external',
        setup(build) {
          const filter = /^[^./]|^\.[^./]|^\.\.[^/]/;
          build.onResolve({ filter }, (args) => ({
            path: args.path,
            external: true,
          }));
        },
      },
    ],
    banner: {
      js: `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
      `,
    },
  };

  try {
    await esbuild.build(esbuildConfig);
    console.log('✅ Esbuild complete.');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Esbuild failed:', message);
    process.exit(1);
  }

  console.log('✨ Build finished successfully!');
}

/**
 * CLI Execution entry point.
 */
export async function runBuildCli(): Promise<void> {
  try {
    await build();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('💥 Unexpected build error:', message);
    process.exit(1);
  }
}

if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith('build.ts') ||
  process.argv[1]?.endsWith('build.js')
) {
  await runBuildCli();
}
