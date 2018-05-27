module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],
    parserOptions: {
        ecmaVersion: 8,
        ecmaFeatures: {
            jsx: false
        },
        sourceType: 'module'
    },
    globals: {
        "Vue": false
    },
    rules: {
        indent: ['error', 4, {
            "SwitchCase": 1
        }],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': 'off'
    }
}