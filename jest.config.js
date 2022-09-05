/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/__tests__/e2e/', '<rootDir>/plugins/'],
    transform: {
      "^.+\\.(tsx)$": "ts-jest"
  },
  moduleNameMapper: {
      '\\.(scss|sass|css)$': 'identity-obj-proxy',
      '^@/components/(.*)$': '<rootDir>/components/$1',

      '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json"
    }
  },
};