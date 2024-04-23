const express = require('express')
const mongoose = require('mongoose');
const Candidate = require('../collections/candidates')
const { addCandidate, upload } = require('../controllers/candidateController')

const router = express.Router()

// add new candidate
router.post('/add-candidate', /*upload.single('resume'),*/addCandidate)

// exporting router
module.exports = router