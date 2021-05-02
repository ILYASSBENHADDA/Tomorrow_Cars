const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/auth')

const { Create, readOwner, readOne, Update, Delete, confirmReq} = require('../controllers/owner.controllers')


// Create Cars
router.post('/addcar', isLoggedIn, Create)

// Read Owner Cars
router.get('/read-owner', isLoggedIn, readOwner)

// Read One Car
router.get('/edit/:id', readOne)

// Update Cars
router.put('/edit', isLoggedIn, Update)

// Delete Cars
router.delete('/delete/:id', isLoggedIn, Delete)

// Confirm car requist
router.post('/confirm-requist', isLoggedIn, confirmReq)


module.exports = router