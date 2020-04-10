const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
//const __dirname = process.cwd()

const config = {
    name: "server",
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
            }
        ]
    }
}

module.exports = config