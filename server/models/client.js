const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Client Schema
let clientSchema = new Schema({
     first_name: {type: String, default: ""},
     last_name: {type: String, default: ""},
     cin: {type: String,  default: ""},
     email: {type: String, default: ""},
     password: {type: String, required: true, default: ""},
     phone: {type: Number, default: ""},
     global_tries: {type: Number, default: 0},
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Client', clientSchema)