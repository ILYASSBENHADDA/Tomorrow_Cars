const mongoose = require('mongoose')

// Connection
const DB_URI = 'mongodb://localhost:27017/cars_db'
const connection = async () => {
     try {
          await mongoose.connect(DB_URI, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useFindAndModify: false,
               useCreateIndex: true,
          })
          console.log('Connected to Database')
     } catch (err) {
          console.log(err)
     }
}

module.exports = connection