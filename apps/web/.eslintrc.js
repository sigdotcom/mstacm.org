module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "import/prefer-default-export": 0,
    "class-methods-use-this": 0,
    "max-classes-per-file": 0,
    "no-param-reassign": 1,
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
    "react/jsx-boolean-value": 0,
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function", },
    ],
    "react/require-default-props": 0,
    '@typescript-eslint/naming-convention': [2,
      {
        selector: 'typeLike',
        format: ['camelCase', 'PascalCase'],
      },
    ],
    "react/destructuring-assignment": 0,
    "arrow-body-style": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-curly-brace-presence": 0,
    "prefer-template": 0,
    "no-restricted-globals": 0,
    "no-restricted-syntax": 0,
    "react/no-array-index-key": 0,
    "react/button-has-type": 0,
    "react/no-unescaped-entities": 0,
    "import/order": 0,
    "react/self-closing-comp": 0,
    "react/function-component-definition": 0,
    "import/newline-after-import": 0,
    "import/no-extraneous-dependencies": 0,
    "no-alert": 0,
    "no-console": 0,
    "no-param-reassign": 0,
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
