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
    "\\.(svg|jpg|png)$": "<rootDir>/test/__mocks__/file-mock",
    "@components/(.*)": "<rootDir>/src/components/$1",
    "@images/(.*)": "<rootDir>/src/images/$1",
    "@pages/(.*)": "<rootDir>/src/pages/$1",
    "@styles/(.*)": "<rootDir>/src/styles/$1",
    "@customTypes/(.*)": "<rootDir>/src/types/$1",
    "@mocks/(.*)": "<rootDir>/test/__mocks__/$1",
    "@util/(.*)": "<rootDir>/src/util/$1"
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