const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: '文件上传',
            template: 'index.html'
        })
    ]
});
