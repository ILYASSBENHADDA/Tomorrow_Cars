const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Car Schema
let carSchema = new Schema({
     registration_number: {type: String, required: true, default: ""},
     name: {type: String, required: true, default: ""},
     mark: {type: String, required: true, default: ""},
     color: {type: String, required: true, default: ""},
     price: {type: Number, required: true, default: ""},
     fuel: {type: String, required: true, default: ""},
     is_saled: {type: Boolean, default: false},
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Car', carSchema)