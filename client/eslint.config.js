import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    settings: {
      react: { version: "detect" },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,


      "react/react-in-jsx-scope": "off",

      "no-console": "warn",
      "eqeqeq": "error",
    },
  },

  {
    files: ["**/*.test.js", "**/*.test.jsx"],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
];