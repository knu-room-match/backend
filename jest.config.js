module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@shard/(.*)$': '<rootDir>/src/modules/shared/$1',
    '^@user/(.*)$': '<rootDir>/src/modules/user/$1',
    '^@auth/(.*)$': '<rootDir>/src/modules/auth/$1',
    '^@chat/(.*)$': '<rootDir>/src/modules/chat/$1',
    '^@survey/(.*)$': '<rootDir>/src/modules/survey/$1',
    '^@email/(.*)$': '<rootDir>/src/modules/email//$1',
  },
  collectCoverage: false,
  testMatch: ['**/*.spec.ts'],
};
