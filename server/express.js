import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {SheetsRegistry} from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {MuiThemeProvider, createGenerateClassName} from 'material-ui/styles'
import theme from './../theme'

import Template from '../views/template'
import MainRouter from './../client/MainRouter'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import devBundler from './devbundle' //Remember to comment out for production built

//connecting express
const app = express()
devBundler.compile(app) //Remember to comment out for production built

//Middleware Config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'html');

//const index = path.join(CURRENT_WORKING_DIR, 'view/index.html')
const Router = React.createFactory(MainRouter)

//Mounting routes with express
app.use('/', userRoutes)
app.use('/', authRoutes)

app.use('*', (req, res) => {
    //Material UI style for SSR
    const sheetsRegistry = new SheetsRegistry()
    const generateClassName = createGenerateClassName()

    //Generating Mackup
    const context = {}
    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={new map()}>
                    <Router/>
                </MuiThemeProvider>
            </JssProvider>
        </StaticRouter>
    )

    //sending template with mackup and css
    if(context.url) {
        return res.redirect(303, context.url)
    }
    const css = sheetsRegistry.toString()

    // const html = fs.readFile(index, 'utf-8', (err, data) => {
    //     if(err) {
    //         console.error('error when reading the file ', err)
    //         res.status(500).send('error when reading index file')
    //     }
    //     data = data.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    //     data = data.replace('<style id="jss-server-side"></style>', `<style id="jss-server-side">${css}</style>`)
    //     return data
    // })

    // res.status(200).send('Hello World')
})

//Handling unauthorized errors with express
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ': ' + err.message})
    }
})

export default app