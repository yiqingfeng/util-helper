const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: '文件上传',
            template: 'index.html',
        }),
    ],
    devServer: {
        allowedHosts: ['localhost', 'wow.ceshi112.com'],
        proxy: {
            // '/FHH/EM0HXUL/Authorize/Login': {
            //     target: 'https://www.ceshi112.com',
            //     changeOrigin: true,
            //     source: false,
            //     cookieDomainRewrite: {
            //         '*': '',
            //     },
            //     onProxyRes: (proxyRes) => {
            //         const cookies = proxyRes.headers['set-cookie']
            //         if (cookies) {
            //             const result = []
            //             cookies.forEach((c) => {
            //                 c = c.replace('Secure', '')
            //                 result.push(c)
            //             })
            //             proxyRes.headers['set-cookie'] = result
            //         }
            //     },
            // },
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
