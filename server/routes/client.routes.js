const express = require('express')
const router = express.Router()
const { reserveCar, tryCar, getTryCar } = require('../controllers/client.controllers')
const { isLoggedIn } = require('../middleware/auth')


// Reserve car
router.post('/reserve-car', isLoggedIn, reserveCar)

// Try Car
router.post('/try-car', isLoggedIn, tryCar)

// Get Try Car
router.get('/get-try-car', isLoggedIn, getTryCar)


module.exports = router