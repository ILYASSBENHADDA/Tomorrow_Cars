const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Client Schema
let clientSchema = new Schema({
     first_name: {type: String, required: true, default: ""},
     last_name: {type: String, required: true, default: ""},
     cin: {type: String, required: true, default: ""},
     email: {type: String, required: true, default: ""},
     password: {type: String, required: true, required: true, default: ""},
     phone: {type: Number, required: true, default: ""},
     global_tries: {type: Number, default: 0},
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Client', clientSchema)