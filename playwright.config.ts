import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  workers: 1,
  use: {
    baseURL: 'http://localhost:5190',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  reporter: [['list']],
});
