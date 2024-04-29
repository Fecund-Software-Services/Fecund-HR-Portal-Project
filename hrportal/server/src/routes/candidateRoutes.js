/*
Project: Hiring Portal Project
Author: HS
Date: 24/4/2024
Sprint: Sprint 3

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  |   Sprint   |    Description 
-------------------------------------------------------------------------------------------------------
29/4/2024           HS                      3                  Search candidate validation
-------------------------------------------------------------------------------------------------------
*/

const express = require('express')
const { addCandidate, searchCandidate, upload } = require('../controllers/candidateController')

const router = express.Router()

// add new candidate
router.post('/add-candidate', upload.single('resume'), addCandidate)

// search for candidates
router.get('/search-candidate', searchCandidate)

// exporting router
module.exports = router