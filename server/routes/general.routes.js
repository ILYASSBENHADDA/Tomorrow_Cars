const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/auth')
const { read, places, carRequist } = require('../controllers/general.controllers')


// Read Cars
router.get('/read', read)


// Places generator
router.post('/places', places)


// Get requist reserve car
router.get('/car-requist', isLoggedIn, carRequist)



module.exports = router