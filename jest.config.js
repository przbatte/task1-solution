module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/__helpers__/', '<rootDir>/node_modules/'],
  globals: {
    TEST_LOCATION: process.env.TEST_LOCATION || '../index',
    'ts-jest': {
      diagnostics: true,
    },
  },
};
