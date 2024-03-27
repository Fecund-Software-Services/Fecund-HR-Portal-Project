const express = require('express')
const User = require('../collections/candidates')
const {signupUser, loginUser} = require('../controllers/userController')

// for creating the instance of the route
const router = express.Router()

// // login user
// router.post('/login', loginUser)


// // signup user
// router.post('/signup', signupUser)


// exporting router
module.exports = router