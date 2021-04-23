const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Reserve Car Schema
let reserveCarSchema = new Schema({
     id_car: { type: Schema.Types.ObjectId, ref: 'Car' },
     id_client: { type: Schema.Types.ObjectId, ref: 'Client' },
     id_owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
     proposed_reduction: {type: Number, default: 0},
     is_accepted: {type: Boolean, default: null}
},
{ 
     versionKey: false
})


module.exports = mongoose.model('ReserveCar', reserveCarSchema)