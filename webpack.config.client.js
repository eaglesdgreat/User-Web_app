const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const CURRENT_WORKING_DIR = process.cwd()

const config = {
    performance: { hints: false },
    name: "browser",
    mode: "development",
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './client/main.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    target: 'web',
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use:{
                    loader: "file-loader?name=client/assets/images/[name].[ext]"
                }
            },
            {
                test: /\.html$/,
                use:{
                    loader: "html-loader"
                }
            }
        ]
    },
    resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html', //the template is the source where thr html file is located
            filename: './index.html',
            excludeChunks: ['server']
        })
    ]
}

module.exports = config