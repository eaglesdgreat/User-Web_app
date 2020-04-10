import webpack from 'webpack'
import webpackMidlleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client'
import config from './../config/config'

const compile = (app) => {
    if(config.env == 'development'){
        const compiler = webpack(webpackConfig)
        const middleware = webpackMidlleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
        app.use(middleware)
        app.use(webpackHotMiddleware(compiler))
    }
}

export default { compile }