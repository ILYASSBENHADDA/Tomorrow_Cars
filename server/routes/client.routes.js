const express = require('express')
const router = express.Router()
const { reserveCar, tryCar, getTryCar } = require('../controllers/client.controllers')



// Reserve car
router.post('/reserve-car', reserveCar)

// Try Car
router.post('/try-car', tryCar)

// Get Try Car
router.get('/get-try-car', getTryCar)


module.exports = router