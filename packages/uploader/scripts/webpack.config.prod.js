const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = env => {
    const isUmd = env.TYPE === 'umd';
    console.log(isUmd);
    return merge(baseConfig, {
        mode: 'production',
        entry: {
            uploader: './src/uploader.js',
        },
        ...(isUmd ? {
            output: {
                filename: '[name].umd.js',
                library: 'uploader',
                libraryTarget: 'umd',
                umdNamedDefine: true,
            }
        }: {})
    });
}
