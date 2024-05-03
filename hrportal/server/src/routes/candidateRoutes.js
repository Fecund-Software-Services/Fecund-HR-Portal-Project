/*
Project: Hiring Portal Project
Author: HS
Date: 24/4/2024
Sprint: Sprint 3

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        | Author                  | Sprint   | Description 
-------------------------------------------------------------------------------------------------------
29/4/2024           HS                      3                  Search candidate validation
30/4/2024           HS                      3                   Edit candidate details
29/4/2024   | HS                      | 3        | Search candidate validation
29/4/2024   | Harshini C              | 3        | View Candidates applied in
-------------------------------------------------------------------------------------------------------
*/

const express = require('express')
const { addCandidate, searchCandidate, upload, editCandidate, viewCandidate, viewCandidatebydate } = require('../controllers/candidateController')

const router = express.Router()

// add new candidate
router.post('/add-candidate', upload.single('resume'), addCandidate)

// view candidate by field
router.get('/search-candidate', searchCandidate)

// view candidate by date
router.get('/view-candidate-bydate', viewCandidatebydate)

// view single candidate
router.get('/view-candidate/:id', viewCandidate) 

// edit existing candidate
router.post('/edit-candidate/:id', upload.single('resume'), editCandidate)


// exporting router
module.exports = router