/**
 * @file tasks.ts
 * @description Merged build tasks: Asset syncing and Production package.json generation.
 */

/* cspell:ignore syncdir */

import { spawn } from 'node:child_process';
import fs, { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import syncdir from 'sync-directory';

import { getPackageManager } from './utils/pkg-manager.js';

/**
 * Combined configuration for build tasks.
 */
export interface BuildConfig {
  // Sync Configuration
  clientDir?: string;
  clientDistDir?: string;
  destination?: string;
  buildCommand?: string;

  // Generation Configuration
  name?: string;
  version?: string;
  type?: 'module' | 'commonjs';
  author?: string;
  license?: string;
  main?: string;
  packagePaths?: string[];
  internalPrefixes?: string[];
  outputDistDir?: string;
}

/**
 * Runs a shell command as a promise.
 */
function runCommand(
  command: string,
  args: string[],
  options: import('node:child_process').SpawnOptions = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Running: ${command} ${args.join(' ')}`);

    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: false,
      ...options,
    });

    child.on('close', (code: number | null) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`❌ Command failed with exit code ${code}`));
      }
    });

    child.on('error', (err: Error) => {
      reject(err);
    });
  });
}

/**
 * Executes asset synchronization and package.json generation sequentially.
 * Throws an error if any required paths or files are not found.
 *
 * @param config The build configuration.
 * @throws {Error} If directories or files are missing.
 */
export async function runBuildTasks(config: BuildConfig): Promise<void> {
  const {
    clientDir: clientDirRaw,
    clientDistDir: distName,
    destination: destRaw,
    buildCommand: customBuildCommand,
    internalPrefixes,
    packagePaths: packagePathsRaw,
    outputDistDir = 'dist',
    name: metaName,
    version: metaVersion,
    type: metaType,
    author: metaAuthor,
    license: metaLicense,
    main: metaMain,
  } = config;

  // --- 1. Asset Syncing ---
  if (clientDirRaw && distName && destRaw) {
    const pkgManager = getPackageManager();
    const buildCommand =
      customBuildCommand ||
      (pkgManager === 'npm' ? 'npm run build' : `${pkgManager} build`);

    const clientDir = path.resolve(process.cwd(), clientDirRaw);
    const distDir = path.join(clientDir, distName);
    const destDir = path.resolve(process.cwd(), destRaw);

    if (!existsSync(clientDir)) {
      throw new Error(
        `📂 Error: Client directory does not exist: ${clientDir}`
      );
    }

    if (!existsSync(destDir)) {
      throw new Error(
        `📂 Error: Destination directory does not exist: ${destDir}`
      );
    }

    if (!existsSync(distDir)) {
      console.log(`🔨 Build directory not found at ${distDir}. Building...`);
      const [cmd, ...args] = buildCommand.split(' ');
      await runCommand(cmd!, args, { cwd: clientDir });

      if (!existsSync(distDir)) {
        throw new Error(
          `🏗️ Error: Build finished but directory was not created: ${distDir}`
        );
      }
    }

    console.log(`🔄 Syncing ${distDir} to ${destDir}...`);

    try {
      // cspell:disable-next-line
      syncdir(distDir, destDir, {
        type: 'copy',
        deleteOrphaned: true,
      });
      console.log(`✅ Sync completed successfully.`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`📂 Sync failed: ${message}`, { cause: error });
    }
  }

  // --- 2. package.json Generation ---
  if (internalPrefixes) {
    const packagePaths =
      packagePathsRaw || (clientDirRaw ? ['.', clientDirRaw] : ['.']);

    const distPath = path.join(outputDistDir, 'package.json');

    try {
      let mergedDeps: Record<string, string> = {};
      let firstPackageData: any = {};

      for (const relPath of packagePaths) {
        const isDir = existsSync(relPath) && statSync(relPath).isDirectory();
        const targetFile = isDir ? path.join(relPath, 'package.json') : relPath;
        const fullPath = path.resolve(targetFile);

        if (!existsSync(fullPath)) {
          throw new Error(`❌ Error: File not found at ${fullPath}`);
        }

        const pkg = JSON.parse(readFileSync(fullPath, 'utf8'));

        if (Object.keys(firstPackageData).length === 0) {
          firstPackageData = pkg;
        }

        const filtered = Object.fromEntries(
          Object.entries(pkg.dependencies || {}).filter(
            ([depName]) =>
              !internalPrefixes.some((prefix) => depName.startsWith(prefix))
          )
        ) as Record<string, string>;

        mergedDeps = { ...mergedDeps, ...filtered };
      }

      const resolvedName = metaName || firstPackageData.name;

      if (!resolvedName) {
        throw new Error(
          '❌ Error: Package name could not be resolved from configuration or source files.'
        );
      }

      const resolvedMain = metaMain || './main.js';
      const resolvedAuthor = metaAuthor || firstPackageData.author;
      const resolvedLicense = metaLicense || firstPackageData.license;
      const resolvedEngines = firstPackageData.engines;

      const distPkg: any = {
        name: resolvedName,
        version: metaVersion || firstPackageData.version || '1.0.0',
        type: metaType || firstPackageData.type || 'module',
        ...(resolvedAuthor && { author: resolvedAuthor }),
        ...(resolvedLicense && { license: resolvedLicense }),
        ...(resolvedEngines && { engines: resolvedEngines }),
        main: resolvedMain,
        exports: { '.': resolvedMain },
        scripts: {
          start: `node ${resolvedMain.replace('./', '')}`,
        },
        dependencies: mergedDeps,
      };

      if (!existsSync(outputDistDir)) {
        fs.mkdirSync(outputDistDir, { recursive: true });
      }

      writeFileSync(distPath, JSON.stringify(distPkg, null, 2));
      console.log(`✅ Success: Generated ${distPath} for "${resolvedName}"`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`📂 Generation failed: ${message}`, { cause: error });
    }
  }
}
