const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",

      globals: {
        ...globals.node,
      },
    },

    ...js.configs.recommended,

    rules: {
      "no-unused-vars": "error",
      "no-console": "off",
      "eqeqeq": "error",
      "no-undef": "error",
      "no-return-await": "error",
    },
  },

  {
    files: ["**/*.test.js"],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];