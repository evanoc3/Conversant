"use strict";

module.exports = {
  bail: 1,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  moduleNameMapper: {
    // Add cases here to mock SCSS & image files
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(svg|png)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: [
    "<rootDir>/test/setup.ts"
  ],
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.test.ts?(x)",
    "<rootDir>/test/**/*.test.ts?(x)"
  ], 
  testPathIgnorePatterns: [
    "<rootDir>[/\\\\](node_modules|.next)[/\\\\]"
  ],
  testURL: "http://localhost:8080/",
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"
  ],
  verbose: true
};