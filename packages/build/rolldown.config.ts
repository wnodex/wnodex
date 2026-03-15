import { defineConfig } from 'rolldown';

export default defineConfig([
  {
    input: {
      index: 'src/index.ts',
      bin: 'src/bin.ts',
    },
    output: {
      format: 'esm',
      dir: 'dist',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      assetFileNames: '[name]-[hash][extname]',
      banner: (chunk) => {
        if (chunk.name === 'bin') {
          return '#!/usr/bin/env node\n';
        }
      },
    },
    platform: 'node',
    external: (id) => {
      if (id.startsWith('node:')) return true;
      if (id.startsWith('.') || id.startsWith('/')) return false;
      return true;
    },
  },
]);
