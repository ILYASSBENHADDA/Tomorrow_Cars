const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
const crud = require('../controllers/crud')

const { isLoggedIn } = require('../middleware/auth')

router.get('/', (req, res) => {
     res.send('Home')
})

// Create Cars
router.post('/addcar', isLoggedIn, crud.create)

// Read Owner Cars
router.get('/read-owner', isLoggedIn, crud.readOwner)

// Read Cars
router.get('/read', crud.read)

// Read One Car
router.get('/edit/:id', isLoggedIn, crud.readOne)

// Update Cars
router.put('/edit', isLoggedIn, crud.update)

// Delete Cars
router.delete('/delete/:id', isLoggedIn, crud.delete)

// Places generator
router.post('/places', crud.places)

// Reserve car
router.post('/reserve-car', crud.reserveCar)

// Reserve car
router.get('/car-requist', isLoggedIn, crud.carRequist)

// Confirm car requist
router.post('/confirm-requist', crud.confirmReq)

// Try Car
router.post('/try-car', crud.tryCar)

// Get Try Car
router.get('/get-try-car', crud.getTryCar)

/******************************************/

// Register 
router.post('/register-onwner', auth.registerOwner)
router.post('/register-client', auth.registerClient)

// Login
router.post('/login-owner', auth.loginOwner)
router.post('/login-client', auth.loginClient)


// LogOut
router.get('/logout', isLoggedIn, auth.logout)


module.exports = router