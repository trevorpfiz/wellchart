import baseConfig, { restrictEnvAccess } from "@wellchart/eslint-config/base";
import nextjsConfig from "@wellchart/eslint-config/nextjs";
import reactConfig from "@wellchart/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
