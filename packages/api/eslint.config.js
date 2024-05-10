import baseConfig from "@wellchart/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**", "src/lib/api/client"],
  },
  ...baseConfig,
];
