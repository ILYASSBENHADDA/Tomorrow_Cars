const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Place Schema
let placeSchema = new Schema({
     place_number: { type: Number },
     is_free: { type: Boolean, default: true }
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Place', placeSchema)