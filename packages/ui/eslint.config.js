import baseConfig from "@wellchart/eslint-config/base";
import reactConfig from "@wellchart/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
