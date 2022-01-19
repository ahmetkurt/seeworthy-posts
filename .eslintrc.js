module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react'],
  ignorePatterns: [
    'manifest.json',
    'package.json',
    'package-lock.json',
    'README.md',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
  },
  overrides: [
    {
      files: ['**/*.test.jsx'],
      env: {
        jest: true,
      },
    },
  ],
};
