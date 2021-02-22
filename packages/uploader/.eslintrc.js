// http://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: 'airbnb-base',
    // required to lint *.vue files
    // plugins: ['html'],
    globals: {
        window: true
    },
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'scripts/webpack.config.base.js',
            },
        },
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                vue: 'never',
            },
        ],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': [
            'error',
            {
                optionalDependencies: ['test/unit/index.js'],
            },
        ],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'import/no-unresolved': 0,
        // allow debugger during development
        'indent': 0,
        'no-restricted-syntax': 0,
        'quotes': [1, 'single'],
        'keyword-spacing': 2,
        'no-console': 0,
        'no-undefined': 1,
        'no-unused-vars': 1,
        'no-shadow-restricted-names': 1,
        'quote-props': 0,
        'dot-notation': 0,
        'no-return-assign': 1,
        'no-nested-ternary': 0,
        'space-before-function-paren': 0,
        'spaced-comment': 0,
        'eol-last': 0,
        'func-names': 1,
        'no-trailing-spaces': 0,
        'no-div-regex': 1,
        'guard-for-in': 1,
        'block-scoped-var': 1,
        'no-shadow': 1,
        'new-cap': ['error', { capIsNew: false }],
        'prefer-const': 1,
        'no-param-reassign': 0,
        'no-unused-expressions': ['error', { allowShortCircuit: true }],
        'no-else-return': 0,
        'prefer-template': 0,
        'consistent-return': 0,
        'max-len': 0,
        'array-callback-return': 0,
        'no-unneeded-ternary': 1,
        'prefer-rest-params': 1,
        'arrow-body-style': 0, //都不好： "always":在函数体周围强制使用大括号; "as-needed":在没有大括号的地方可以省略（默认）;"never":在函数体周围不加任何大括号（限制箭头函数返回表达式的角色）
        'object-shorthand': 1,
        'one-var': 0,
        'eqeqeq': 0,
        'radix': 0,
        'no-alert': 0,
        'no-underscore-dangle': 0,
        'import/first': 0,
        'import/newline-after-import': 0,
        'no-mixed-operators': 0,
        'no-plusplus': 0,
        'no-continue': 0,
        'no-prototype-builtins': 0,
        'func-names': ['error', 'always'],
        'linebreak-style': 0,
        'no-new': 0,
        'guard-for-in': 0, // 两层for-in时第一层有可能没有if呀
        'no-eval': 0,
        'operator-assignment': [0, 'always'],

        'comma-dangle': 0,
        'func-names': 0,
        'prefer-destructuring': 1,
        'semi': 0, // ['error', 'never']
    },
}
