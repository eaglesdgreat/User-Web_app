import mongoose from 'mongoose'
//import path from 'path'

//import template from './../template'
import config from './../config/config'
import app from './express'

//connecting of mongodb with mongoose
mongoose.connect(config.mongoUri, { useNewUrlParser: true }).then(conn => conn).catch(console.error)

// const HTML = path.join(__dirname, 'index.html')

// app.get('/', (req, res) => {
//     res.status(200).sendFile(HTML)
// })

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})