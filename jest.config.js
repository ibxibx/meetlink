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
  testEnvironment: "jsdom"
};