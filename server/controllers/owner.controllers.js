const Car = require('../models/car')
const OwnerCar = require('../models/owner_car')
const Place = require('../models/place')
const ReserveCar = require('../models/reserve_car')
const jwt = require('jsonwebtoken')



// Create
exports.Create = (req, res) => {
     const {registrationNumber, name, mark, color, price, fuel} = req.body
     
     // Get Owner ID
     let owner_id  
     const token = req.cookies.ownership
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               owner_id = decodedToken.id
          })
     } else {
          return res.json('NOOP')
     }

     // Create Owner Car
     new Car({
          registration_number: registrationNumber,
          name: name,
          mark: mark,
          color: color,
          price: price,
          fuel: fuel,
     })
     .save()
     .then(async data => {
          // Get place id AND update is_free
          const place_id = await Place.findOneAndUpdate({is_free: true}, {is_free: false}).select('_id')

          new OwnerCar({
               id_owner: owner_id,
               id_car: data._id,
               id_place: place_id._id
          }).save().then(()=> {
               console.log('Owner Car inserted')
          })
          return res.status(200).send('Data Sent')
     })

}



// Read Owner Cars
exports.readOwner = (req, res) => {

     //Get Owner ID
     let owner_id
     const token = req.cookies.ownership
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               owner_id = decodedToken.id
          })
     } else {
          return res.json('NOOP')
     }

     //Find Onwer ID
     OwnerCar.find({id_owner: owner_id}).populate('id_car id_place').then(data => {
          res.json(data)
     })
}



// Read One item
exports.readOne = (req, res) => {
     const id = req.params.id

     Car.findById(id).exec(function(err, data){
          if(err) throw err
          return res.status(200).send(data)
     })
}



// Update
exports.Update = (req, res) => {
     const {id, registration_number, name, mark, color, price, fuel} = req.body

     const carInfo = {
          registration_number: registration_number,
          name: name,
          mark: mark,
          color: color,
          price: price,
          fuel: fuel     
     }
     // const id = req.body.id

     Car.findByIdAndUpdate(id, carInfo).exec((err, data) => {
          if(err) throw err
          res.status(200).send('Data Updated!')
     })
}



// Delete
exports.Delete = (req, res) => {
     const id = req.params.id
     Car.findByIdAndRemove(id, function(err) {
          if (err) throw err
          res.status(200).send('Data Deleted!')
     })
}



// confirm car requist
exports.confirmReq = (req, res) => {
     const { id, id_car, confirm } = req.body

     console.log(id, confirm)

     ReserveCar.findByIdAndUpdate(id, {is_accepted: confirm}).populate('id_car id_client')
     .then(()=> {
          Car.findByIdAndUpdate(id_car, { is_saled: true }).then(() => {
               res.json({message: 'You\'re confermed!'})
          })
     })
}