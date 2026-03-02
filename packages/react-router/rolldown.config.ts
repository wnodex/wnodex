import { defineConfig } from 'rolldown';

export default defineConfig([
  {
    input: ['src/index.ts'],
    output: {
      format: 'esm',
      dir: 'dist',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      assetFileNames: '[name]-[hash][extname]',
    },
    platform: 'node',
    external: (id) => {
      if (id.startsWith('node:')) return true;
      if (id.startsWith('.') || id.startsWith('/')) return false;
      return true;
    },
  },
]);
