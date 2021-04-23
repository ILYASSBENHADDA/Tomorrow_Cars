const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Onwer Car Schema
let onwerCarSchema = new Schema({
     id_owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
     id_car: { type: Schema.Types.ObjectId, ref: 'Car' },
     id_place: { type: Schema.Types.ObjectId, ref: 'Place' }
},
{ 
     versionKey: false
})


module.exports = mongoose.model('OnwerCar', onwerCarSchema)