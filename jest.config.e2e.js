module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!puppeteer)/',
  ],
  testMatch: [
    "<rootDir>/src/e2e/**/*.{js,jsx,ts,tsx}"
  ],
  moduleDirectories: ["node_modules", "src"]
};