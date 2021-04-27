const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Owner Schema
let ownerSchema = new Schema({
     first_name: {type: String, required: true, default: ""},
     last_name: {type: String, required: true, default: ""},
     cin: {type: String, required: true, default: ""},
     email: {type: String, required: true, default: ""},
     password: {type: String, required: true, default: ""},
     rib: {type: Number, default: ""},
     phone: {type: Number, required: true, default: ""},
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Owner', ownerSchema)