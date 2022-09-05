// playwright.config.ts
import { type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:8000/scan/'
  },
  testDir: './__tests__/e2e'
};
export default config;