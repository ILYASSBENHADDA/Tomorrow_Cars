const jwt = require('jsonwebtoken');
const Owner = require('../models/owner');
const Client = require('../models/client');


exports.isLoggedIn =  (req, res, next) => {
    const token = req.cookies.ownership || req.cookies.clientship

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) throw err
            
            else {
                // req.user = await Owner.findById(decodedToken.id).select('-password')
                // if (decodedToken.role === 'owner') {
                //     res.json({ role: 'Owner', isAuthenticated: true })
                // }
                next()
            }
        })
    }
    else {
        res.status(400).json('you\'re not logged in')
    }

}


// check current user
exports.checkUser = (req, res, next) => {
    const token = req.cookies.ownership || req.cookies.clientship
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                decodedToken.role === 'owner'
                ? res.status(200).clearCookie('ownership').json({ role: 'Owner'})
                : res.status(200).clearCookie('clientship').json({ role: 'Client'})
            } 
            else {
                decodedToken.role === 'owner'
                    ? res.status(200).json({ role: 'Owner', isAuthenticated: true })
                    : res.status(200).json({ role: 'Client', isAuthenticated: true })
            }
        })
    } 
    else {
        res.status(200).json({ role: '', isAuthenticated: false})
    }
}