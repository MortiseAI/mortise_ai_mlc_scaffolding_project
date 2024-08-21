const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {

    entry: {
        home: './src/project/mai-home/mai-home-page',
        vcode: './src/project/mai-vcode/mai-vcode-page',
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
            title: 'MortiseAI | Home',
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            title: 'MortiseAI | Home',
            filename: 'home.html',
            template: path.resolve(__dirname, '../src/project/mai-home/mai-home-page.html'),
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            title: 'MortiseAI | VerificationCode',
            filename: 'vcode.html',
            template: path.resolve(__dirname, '../src/project/mai-vcode/mai-vcode-page.html'),
            chunks: ['vcode']
        }),
    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../publish/')
    },

}
