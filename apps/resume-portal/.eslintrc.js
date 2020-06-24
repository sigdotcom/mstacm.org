module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: "module"
  },
  rules: {
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "class-methods-use-this": 0,
    "max-classes-per-file": 0,
    "no-param-reassign": 1,
    "no-unused-vars": [2, { args: "after-used" }],
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "react/jsx-boolean-value": 0
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    },
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};
