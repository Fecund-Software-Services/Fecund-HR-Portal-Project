const express = require('express')
const User = require('../collections/users')
const {signupUser, loginUser, forgotPassword, resetPassword} = require('../controllers/userController')

// for creating the instance of the route
const router = express.Router()

// login user
router.post('/login', loginUser)

// signup user
router.post('/signup', signupUser)

// resetting password for a user
router.post('/forgotPassword', forgotPassword)

// updating password for a user
router.post('/resetPassword', resetPassword)

// exporting router
module.exports = router