const Client = require('../models/client')
const OwnerCar = require('../models/owner_car')
const ReserveCar = require('../models/reserve_car')
const TryCar = require('../models/try_car')
const jwt = require('jsonwebtoken')



// Reserve car
exports.reserveCar = async (req, res) => {
     // Get Car ID && Proposed Reduction
     const { id, reduction } = req.body

     // Get Client ID
     let client_id
     const token = req.cookies.clientship
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               client_id = decodedToken.id
          })
     } else {
          return res.json('NOOP')
     }

     // Get Owner ID
     const owner_id = await OwnerCar.findOne({id_car: id}).select('id_owner')

     ReserveCar.findOne({id_car: id, id_client: client_id}).then(data => { 
          if(data) {
               return res.json({message: "This car is already reserved!", status: "no"})
          }

          // Add reserve requist
          new ReserveCar({
               id_car: id,
               id_client: client_id,
               id_owner: owner_id.id_owner,
               proposed_reduction: reduction
          }).save()
          .then(()=> {
               res.json({message: 'Reservation requist is sent!'})
          })

     })

}



// Try Car
exports.tryCar = async (req, res) => {
     const { id } = req.body
     
     // Get Client ID
     let client_id
     const token = req.cookies.clientship
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               client_id = decodedToken.id
          })
     } else {
          return res.json('NOOP')
     }

     const globalTries = await Client.findById(client_id).select('global_tries')

     console.log(globalTries)


     if(globalTries.global_tries === 10) {
          return res.json({message: 'You\'are reach max tries', satatus: 'no'})
     }
     
     TryCar.findOne({id_car: id, id_client: client_id}).then(data => {
          if(data) {
               return res.json({message: "This car is already tested!", satatus: 'no'})
          }

          new TryCar({
               id_car: id,
               id_client: client_id
          }).save()
          .then(()=> {
               Client.findByIdAndUpdate(client_id, {$inc: { global_tries: 1}}).then(()=> {
                    res.json({message: 'You\'ll test this car'})
               })
               console.log('GOOD')
          })

     })

}



// Get Try Car
exports.getTryCar = async (req, res) => {

     // Get Client ID
     let client_id
     const token = req.cookies.clientship
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               client_id = decodedToken.id
          })
     } else {
          return res.json('NOOP')
     }


     TryCar.find({id_client: client_id}).populate('id_car id_client')
     .then(data => {
          return res.json(data)
     })
}