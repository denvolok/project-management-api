const baseConfig = require("./base");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...baseConfig,
  extends: [
    require.resolve("@vercel/style-guide/eslint/next"),
    "next/core-web-vitals",
    ...baseConfig.extends,
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
};
