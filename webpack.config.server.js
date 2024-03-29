const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const config = {
    name: "servers",
    entry: [path.join(__dirname, '/server/server.js')],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'server.generated.js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    target: "node",
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
      },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
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
        ]
    }
}

module.exports = config