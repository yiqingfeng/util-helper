/**
 * @description 资源打包
 */
const ESLintPlugin = require('eslint-webpack-plugin');
const { getPath } = require('./utils');

module.exports = {
    // entry: {
    //     uploader: './src/uploader.js',
    // },
    output: {
        // filename: '[name].[contenthash].js',
        filename: '[name].js',
    },
    resolve: {
        alias: {
            '@': getPath('src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
        ]
    },
    plugins: [
        new ESLintPlugin()
    ]
};
