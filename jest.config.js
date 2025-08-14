export default {
  testEnvironment: "node",
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testMatch: ["**/test/**/*.test.js"],
  extensionsToTreatAsEsm: [".js"],
  moduleFileExtensions: ["js", "json", "node"],
};
