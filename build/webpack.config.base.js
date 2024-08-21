const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {

    entry: {
        main: './src/project/mai-main/mai-main-page',
    },

    module: {
        rules: [
            {
                test: /\.(js|tsx|ts|jsx)$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.(c|le)ss$/i,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                loader: 'url-loader',
                options: {
                    limit: 5120,
                    outputPath: './dist',
                    name: '[name].[hash:5].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|avi)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:5].[ext]',
                    outputPath: './dist'
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
                use: 'file-loader?name=[hash:12].[ext]'
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    devServer: {
        static: path.join(__dirname, '../dist'),
        compress: true,
        port: 12393,
        host: '0.0.0.0',
        proxy: {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            }
        },
    },

    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        new HtmlWebpackPlugin({
            title: 'MortiseAI | Main',
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            title: 'MortiseAI | Main',
            filename: 'main.html',
            template: path.resolve(__dirname, '../src/project/mai-main/mai-main-page.html'),
            chunks: ['main']
        }),
    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../publish/')
    },

}
