import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import {SheetsRegistry} from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {MuiThemeProvider, createMuiTheme, createGenerateClassName} from 'material-ui/styles'
import {indigo, pink} from 'material-ui/colors'

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
app.use('/dist', express.static(path.join(__dirname, 'dist', 'index.html')))

//Mounting routes with express
app.use('/', userRoutes)
app.use('/', authRoutes)

function Template({markup, css}) {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Great App</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <style>
              a{
                text-decoration: none
              }
        </style>
      </head>
      <body style="margin:0">
        <div id="root">${markup}</div>
        <style id="jss-server-side">${css}</style>
        <script type="text/javascript" src="/dist/bundle.js"></script>
      </body>
    </html>`
}

app.get('*', (req, res) => {
    //Material UI style for SSR
    const sheetsRegistry = new SheetsRegistry()
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#757de8',
                main: '#3f51b5',
                dark: '#002984',
                constrastText: '#fff'
            },
            secondary: {
                light: '#ff79b0',
                main: '#ff4081',
                dark: '#c60055',
                constrastText: '#000'
            },
            openTitle: indigo['400'],
            protectedTitle: pink['400'],
            type: 'light'
        }
    })
    const generateClassName = createGenerateClassName()

    //Generating Mackup
    const context = {}
    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.uel} context={context}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={new map()}>
                    <MainRouter/>
                </MuiThemeProvider>
            </JssProvider>
        </StaticRouter>
    )

    //sending template with mackup and css
    if(context.url) {
        return res.redirect(303, context.url)
    }
    const css = sheetsRegistry.toString()
    res.status(200).sendFile(Template({
        markup,
        css
    }))
})

//Handling unauthorized errors with express
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ': ' + err.message})
    }
})

export default app