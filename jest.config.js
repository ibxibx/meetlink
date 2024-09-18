module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!jest-cucumber)"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js"
  ],
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx}",
    "<rootDir>/src/features/**/*.test.{js,jsx}"
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx}",
    "<rootDir>/src/**/*.test.{js,jsx}",
    "<rootDir>/src/**/*.spec.{js,jsx}",
    "<rootDir>/src/features/**/*.test.{js,jsx}",
    "<rootDir>/src/e2e/**/*.{js,jsx}"
  ],
  moduleDirectories: ["node_modules", "src"]
};