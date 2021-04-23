const express = require('express')
const app = express()
const port = process.env.PORT || 3030 
const connection = require('./config/db_config')()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv")
dotenv.config({ path: './.env'})

const { checkUser } = require('./middleware/auth')
////////
const corsOptions = {
     origin: 'http://localhost:3000', 
     credentials: true, //access-control-allow-credentials:true
     optionSuccessStatus: 200
}


// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))



// define routers
app.use('/api', require('./routes/pages'))
app.use('*', checkUser)




app.listen(port, () => {
     console.log(`Server running on port ${port}...`)
})