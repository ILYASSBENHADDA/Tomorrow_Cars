const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Try Car Schema
let tryCarSchema = new Schema({
     id_car: { type: Schema.Types.ObjectId, ref: 'Car' },
     id_client: { type: Schema.Types.ObjectId, ref: 'Client' },
},
{ 
     versionKey: false
})


module.exports = mongoose.model('TryCar', tryCarSchema)