module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'eslint:recommended',
        'airbnb'
    ],
    plugins: ['react', '@typescript-eslint'],
    parserOptions: {
        ecmaVersion: '2019',
        sourceType: 'module',
        ecmaFeature: {
            tsx: true,
        },
    },
    rules: {
        'semi': 1,
        'no-console': 0,
        'no-redeclare': 0,
        'no-undef': 0,
        'no-unused-vars': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-namespace': 0,
        'object-curly-newline': 0,
        'arrow-body-style': 0,
        'react/prop-types': 0,
        'react/jsx-filename-extension': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'import/no-extraneous-dependencies': 0,
        'react/jsx-one-expression-per-line': 0,
        'no-shadow': 0,
        'camelcase': 0,
        'indent': 0,
    },
    settings: {
        react: {
            version: 'detect',
        },
        "import/resolver": {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
                paths: ['src']
            },
        } 
    },
};
