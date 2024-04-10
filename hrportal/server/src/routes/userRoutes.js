const express = require('express')
const User = require('../collections/users')
const {signupUser, loginUser, forgotPassword} = require('../controllers/userController')

// for creating the instance of the route
const router = express.Router()

// login user
router.post('/login', loginUser)

// signup user
router.post('/signup', signupUser)

// resetting password for a user
router.post('/forgotPassword', forgotPassword)

// exporting router
module.exports = router