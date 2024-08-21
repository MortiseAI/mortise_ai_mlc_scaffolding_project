const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseConf = require('./webpack.config.base')
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseConf, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hot: __isDEV,
                            // reloadAll: __isDEV
                        }
                    },
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'vendor-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial',
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),
        new CompressionPlugin({
            // filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$/,
            threshold: 10240, // 对超过10k的数据进行压缩
            minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        }),
    ]
})
