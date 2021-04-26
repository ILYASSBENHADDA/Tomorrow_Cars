const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/auth')
const { registerOwner, registerClient, loginOwner, loginClient, logout } = require('../controllers/auth.controllers')


// Register 
router.post('/register-onwner', registerOwner)
router.post('/register-client', registerClient)

// Login
router.post('/login-owner', loginOwner)
router.post('/login-client', loginClient)

// LogOut
router.get('/logout', isLoggedIn, logout)


module.exports = router