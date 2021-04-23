const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Owner Schema
let ownerSchema = new Schema({
     first_name: {type: String, default: ""},
     last_name: {type: String, default: ""},
     cin: {type: String,  default: ""},
     email: {type: String, default: ""},
     password: {type: String, required: true, default: ""},
     rib: {type: Number, default: ""},
     phone: {type: Number, default: ""},
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Owner', ownerSchema)