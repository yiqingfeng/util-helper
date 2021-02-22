const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '文件上传',
            template: 'index.html',
            chunks: ['app'],
        }),
    ],
    devServer: {
        allowedHosts: ['localhost', 'wow.ceshi112.com'],
        proxy: {
            '/FSC/EM/File': {
                target: 'https://www.ceshi112.com',
                changeOrigin: true,
                source: false,
                cookieDomainRewrite: {
                    '*': '',
                },
                onProxyRes: (proxyRes) => {
                    const cookies = proxyRes.headers['set-cookie']
                    if (cookies) {
                        const result = []
                        cookies.forEach((c) => {
                            c = c.replace('Secure', '')
                            result.push(c)
                        })
                        proxyRes.headers['set-cookie'] = result
                    }
                },
            },
        },
    },
})
