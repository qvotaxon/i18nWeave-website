import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

export default [
  {
    files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["src/**/gatsby-types.d.ts"],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint,
      import: importPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...prettier.rules,
      "react/prop-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "import/order": ["error", { "groups": [["builtin", "external", "internal"]] }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["src/**/*.jsx"],
    rules: {
      "no-unused-vars": "warn",
    },
  },
  {
    files: ["src/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn", // Add a more strict rule for .tsx files
    },
  },
];