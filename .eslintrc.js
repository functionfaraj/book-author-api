module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jasmine: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-unsafe-finally': 1,
    'no-undef': 2,
    'no-await-in-loop': 2,
    'no-const-assign': 2,
    'no-debugger': 2,
    'no-console': 1,
    'no-duplicate-case': 2,
    'no-duplicate-imports': 2,
    'no-empty-pattern': 2,
    'no-unexpected-multiline': 2,
    'no-unreachable': 2
  }
};
