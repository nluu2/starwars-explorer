import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './src',
  testMatch: ['**/__tests__/**/*.test.ts'],
  clearMocks: true,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          experimentalDecorators: true,
        },
      },
    ],
  },
}

export default config
