const bcrypt = require('bcrypt')
const Client = require('../models/client')
const Owner = require('../models/owner')
const jwt = require('jsonwebtoken')


// Create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
     return jwt.sign({ id, role }, process.env.JWT_SECRET, {
          expiresIn: maxAge
     })
}


// Register
exports.registerOwner = (req, res) => {
     const {firstName, lastName, cin, email, rib, phone, password} = req.body

     let hashedPassword = bcrypt.hashSync(password, 8)

     Owner.findOne({email: email}).then(function(owner) {

          // check if a owner found with this email
          if (owner) {
              return res.json({message: 'The Email Has Inserted is already exist!'})
          }
  
          // otherwise store client info in the Database
          new Owner({
               first_name: firstName,
               last_name: lastName,
               cin: cin,
               email: email,
               rib: rib,
               phone: phone,
               password: hashedPassword
          }).save(function(err, ownerData) {
               if (err) throw err

               return res.status(200).json({message: 'You\'re registration done by seccess!'})
          })
     }).catch(function(err) {console.log(err)})
}


exports.registerClient = (req, res) => {
     const {firstName, lastName, cin, email, phone, password} = req.body

     let hashedPassword = bcrypt.hashSync(password, 8)

     Client.findOne({email: email}).then(function(client) {

          // check if a owner found with this email
          if (client) {
              return res.json({message: 'The Email Has Inserted is already exist!'})
          }
  
          // otherwise store client info in the Database
          new Client({
               first_name: firstName,
               last_name: lastName,
               cin: cin,
               email: email,
               phone: phone,
               password: hashedPassword
          }).save(function(err, clientData) {
               if (err) throw err

               return res.status(200).json({message: 'You\'re registration done by seccess!'})
          })
     }).catch(function(err) {console.log(err)})
}


// Login
exports.loginOwner = (req, res) => {
     const {email, password} = req.body

     Owner.findOne({email: email}).then(function(owner) {

          // if no user found
          if (!owner) {
               return res.send({message: "Email or Password Incorrect!"})
          }

          // check password validity
          if (!bcrypt.compareSync(password, owner.password)) {
               return res.send({message: "Email or Password Incorrect!"})
          }

          // Setup Token in Cookie
          const role = 'owner'
          const token = createToken(owner._id, role)
          return res.status(200).cookie('ownership', token, {
               httpOnly: true,
               maxAge: maxAge * 1000
          }).json({message: 'You\'re LoggedIn'})

     }).catch(function(err) {console.log(err)})
 
}

exports.loginClient = (req, res) => {
     const {email, password} = req.body

     Client.findOne({email: email}).then(function(client) {

          // if no user found
          if (!client) {
               return res.send({message: "Email or Password Incorrect!"})
          }

          // check password validity
          if (!bcrypt.compareSync(password, client.password)) {
               return res.send({message: "Email or Password Incorrect!"})
          }


          // Setup Token in Cookie
          const role = 'client'
          const token = createToken(client._id, role)
          return res.status(200).cookie('clientship', token, {
               httpOnly: false,
               maxAge: maxAge * 1000
          }).json({message: 'You\'re LoggedIn'})

     }).catch(function(err) {console.log(err)})
 
}


exports.logout = (req, res) => {
    res.cookie('ownership', '', { maxAge: 1 })
    res.cookie('clientship', '', { maxAge: 1 })
    res.redirect('/')
}