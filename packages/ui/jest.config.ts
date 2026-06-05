import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: './src',
  testMatch: ['**/__tests__/**/*.test.tsx'],
  clearMocks: true,
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          experimentalDecorators: true,
          ignoreDeprecations: '6.0',
        },
      },
    ],
  },
  moduleNameMapper: {
    '\\.module\\.css$': '<rootDir>/__mocks__/styleMock.ts',
  },
}

export default config
