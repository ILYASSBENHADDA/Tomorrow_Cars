const Client = require('../models/client')
const Car = require('../models/car')
const OwnerCar = require('../models/owner_car')
const Place = require('../models/place')
const ReserveCar = require('../models/reserve_car')
const TryCar = require('../models/try_car')
const jwt = require('jsonwebtoken');



// Create
exports.create = (req, res) => {
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

// Read All Cars
exports.read = (req, res) => {
     Car.find({}, (err, data) => {
          if (err) throw err
          res.status(200).send(data)
     }).sort({"_id": -1})
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
exports.update = (req, res) => {
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
exports.delete = (req, res) => {
     const id = req.params.id
     Car.findByIdAndRemove(id, function(err) {
          if (err) throw err
          res.status(200).send('Data Deleted!')
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
          return res.json({message: 'You\'are reach max tries'})
     }
     
     TryCar.findOne({id_car: id, id_client: client_id}).then(data => {
          if(data) {
               return res.json({message: "This car is already tested!"})
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
               return res.json({message: "This car is already reserved!"})
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



// Car requists
exports.carRequist = async (req, res) => {

     // Get Owner ID
     let owner_id  
     const token = req.cookies.ownership || req.cookies.clientship
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               if(decodedToken.role === 'owner') {
                    ReserveCar.find({id_owner: decodedToken.id, is_accepted: { $ne: false } }).populate('id_car id_client')
                    .then(data => {
                         return res.json(data)
                    })
               }
               else if(decodedToken.role === 'client') {
                    ReserveCar.find({id_client: decodedToken.id}).populate('id_car id_client')
                    .then(data => {
                         return res.json(data)
                    })
               }
          })
     } else {
          return res.json('NOOP')
     }

     

}


// confirm car requist
exports.confirmReq = (req, res) => {
     const {id, confirm } = req.body

     console.log(id, confirm)

     ReserveCar.findByIdAndUpdate(id, {is_accepted: confirm}).populate('id_car id_client')
     .then(()=> {
          res.json({message: 'You\'re confermed!'})
     })
}

// client list car requist
// exports.clientListCarReq = (req, res) => {
//      const {id, confirm } = req.body

//      console.log(id, confirm)

// }



// Places generator
exports.places = async (req, res) => {
     let i = 1
     while (i <= 20) {

          const places = await new Place({
               place_number: i,
          })
          places.save()
          .then( data => {
               res.json(data)
          })

          i+=1
     }
     
     // for(i = 1; i <= 40; i++) {
     //      const places = await new Place({
     //           place_number: i,
     //      })
     //      places.save()
     //      .then( data => {
     //           res.json(data)
     //      })
     // }     
}