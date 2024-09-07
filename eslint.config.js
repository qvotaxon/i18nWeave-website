// eslint.config.js
const { ESLint } = require('eslint');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import'); // Ensure this is installed

module.exports = {
  files: ['**/*.ts', '**/*.tsx'],

  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 2020, // Lowered to align with ESLint requirements if it needs it
      sourceType: 'module'
    }
  },

  plugins: {
    '@typescript-eslint': typescriptEslintPlugin,
    'import': importPlugin
  },

  rules: {
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase']
      }
    ],
    // '@typescript-eslint/semi': 'warn',
    curly: 'warn',
    eqeqeq: 'warn',
    'no-throw-literal': 'warn',
    // semi: 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    'import/no-cycle': ['error', { maxDepth: 1 }],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index']
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        distinctGroup: true,
        warnOnUnassignedImports: false
      }
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../*', './*'] // Restrict relative imports
      }
    ]
  },

  ignores: ['public', '**/*.d.ts', '**/index.ts'],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx']
      }
    }
  }
};