import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'

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
app.use(express.static(path.join(__dirname, 'index.html')))

//Mounting routes with express
app.use('/', userRoutes)
app.use('/', authRoutes)

//Handling errors with express
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ': ' + err.message})
    }
})

export default app