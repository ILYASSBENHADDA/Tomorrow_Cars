const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Car Schema
let carSchema = new Schema({
     registration_number: {type: String, default: ""},
     name: {type: String, default: ""},
     mark: {type: String,  default: ""},
     color: {type: String, default: ""},
     price: {type: Number, default: ""},
     fuel: {type: String, default: ""},
     is_saled: {type: Boolean, default: false},
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Car', carSchema)