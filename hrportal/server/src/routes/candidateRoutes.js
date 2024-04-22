const express = require('express')
const Candidate = require('../collections/candidates')
const { addCandidate } = require('../controllers/candidateController')
// for creating the instance of the route
const router = express.Router()

// login user
router.post('/add-candidate', addCandidate)

// exporting router
module.exports = router