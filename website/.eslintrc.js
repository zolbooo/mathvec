module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  ignorePatterns: ['*.spec.ts', '*.test.ts'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
};
