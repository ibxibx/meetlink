module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(@babel/runtime)/)"],
};
