const Client = require('../models/client')
const Car = require('../models/car')
const Place = require('../models/place')
const ReserveCar = require('../models/reserve_car')
const jwt = require('jsonwebtoken')



// Read All Cars
exports.read = (req, res) => {
     Car.find({is_saled: false}, (err, data) => {
          if (err) throw err
          res.status(200).send(data)
     }).sort({"_id": -1})
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


// Profile
exports.profile = async (req, res) => {

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
     
     Client.findById(client_id)
     .then(data => {
          return res.json(data)
     })
}