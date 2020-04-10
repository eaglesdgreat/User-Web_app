const path = require('path')
const webpack = require('webpack')


const config = {
    mode: "production",
    entry: 'client/main.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/' 
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use:{
                    loader: "file-loader?name=/client/assets/images/[name].[ext]"
                }
            }
        ]
    }
}

module.exports = config