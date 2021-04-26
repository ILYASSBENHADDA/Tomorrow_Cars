require('dotenv').config({ path: './.env' })
require('./config/db.js')
const express = require('express')
const app = express()
const port = process.env.PORT || 3030
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { checkUser } = require('./middleware/auth')
const morgan = require('morgan')
const fs = require('fs')



// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json())
const corsOptions = {
     origin: 'http://localhost:3000', 
     credentials: true, //access-control-allow-credentials:true
     optionSuccessStatus: 200
}
app.use(cors(corsOptions))


// Logs
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags:'a'})
app.use(morgan('[:date[clf]] :method :status :url [HTTP/:http-version] :response-time[digits]', {
     stream: accessLogStream
}))


// define routers
app.use('/api', require('./routes/general.routes'))
app.use('/api', require('./routes/auth.routes'))
app.use('/api', require('./routes/client.routes'))
app.use('/api', require('./routes/owner.routes'))
app.use('*', checkUser)



app.listen(port, () => {
     console.log(`Server running on port ${port}...`)
})