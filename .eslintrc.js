const path = require('path');

// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  env: { browser: true, es6: true, node: true },
  extends: ['react-app', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react-hooks'],

  rules: {
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': ['off'],

    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info', 'log'],
      },
    ],

    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    // Functional and class components are equivalent from React’s point of view
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': 'off',

    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': 'error',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },

  settings: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'config/webpack.config.js'),
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: { browser: true, es6: true, node: true },
      extends: [
        // 'eslint:recommended',
        // 'plugin:react/recommended',
        // 'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: ['react', '@typescript-eslint'],
      rules: {
        // indent: ['error', 2, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        // 'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/camelcase': 0,
        // '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-var-requires': 0,
        'no-case-declarations': 0,
        'react/display-name': 0,
        'react/prop-types': 0,
      },
      settings: { react: { version: 'detect' } },
    },
  ],
};
