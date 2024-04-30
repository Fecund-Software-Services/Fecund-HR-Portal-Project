/*
Project: Hiring Portal Project
Author: HS
Date: 24/4/2024
Sprint: Sprint 3

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        | Author                  | Sprint   | Description 
-------------------------------------------------------------------------------------------------------
29/4/2024   | HS                      | 3        | Search candidate validation
29/4/2024   | Harshini C              | 3        | View Candidates applied in
-------------------------------------------------------------------------------------------------------
*/

const express = require('express')
const { addCandidate, searchCandidate, viewCandidate, upload } = require('../controllers/candidateController')

const router = express.Router()

// add new candidate
router.post('/add-candidate', upload.single('resume'), addCandidate)

// search for candidates
router.get('/search-candidate', searchCandidate)

// view for candidates
router.get('/view-candidate', viewCandidate)

// exporting router
module.exports = router