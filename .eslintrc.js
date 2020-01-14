module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-empty-pattern': 'off',
    'no-unused-vars': 'off',
    'max-len': ['error', {
      code: 140,
    }],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    "import/extensions": "off",
  },
};
