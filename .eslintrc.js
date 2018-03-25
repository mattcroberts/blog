module.exports = {
    env: {
        browser: false,
        node: true,
        es6: true,
        mocha: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: [],
    rules: {
        'no-var': ['error'],
        'prefer-const': ['error'],
        'no-console': 0,
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'quote-props': ['error', 'consistent-as-needed'],
        'semi': ['error', 'always'],
        'no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
        ]
    }
};
