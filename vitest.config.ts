import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    include: ['**/*.test.tsx', '**/*.test.ts', '**/*.test.js', '**/*.test.jsx'],
    globals: true
  }
});
