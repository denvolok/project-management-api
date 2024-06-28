const project = require("node:path").resolve(__dirname, "tsconfig.json");

module.exports = {
  root: true,
  extends: ["@repo/eslint-config/node.js"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  parserOptions: {
    project,
  },
};
