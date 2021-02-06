"use strict";

const { defaults } = require("jest-config");

module.exports = {
  clearMocks: true,
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      babelConfig: ".babelrc"
    }
  },
  moduleDirectories: [
    "node_modules",
    "src",
    "test"
  ],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "ts",
    "tsx"
  ],
  moduleNameMapper: { // Add cases here to mock not-real modules
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(svg|jpg|png)$": "<rootDir>/test/mocks/file"
  },
  preset: "ts-jest",
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
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"
  ],
  verbose: true
};