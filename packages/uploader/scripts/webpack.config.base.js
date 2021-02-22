/**
 * @description 资源打包
 */
const { getPath } = require('./utils');

module.exports = {
    entry: {
        uploader: './src/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
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
            }
        ]
    }
};
