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
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@user/(.*)$': '<rootDir>/src/user/$1',
    '^@auth/(.*)$': '<rootDir>/src/auth/$1',
    '^@chat/(.*)$': '<rootDir>/src/chat/$1',
    '^@survey/(.*)$': '<rootDir>/src/survey/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
  },
  collectCoverage: false,
  testMatch: ['**/*.spec.ts'],
};
