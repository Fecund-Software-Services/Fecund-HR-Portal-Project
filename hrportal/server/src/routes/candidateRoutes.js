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
30/4/2024           HS                      3                   Edit candidate details
-------------------------------------------------------------------------------------------------------
*/

const express = require('express')
const { addCandidate, searchCandidate, upload, editCandidate, viewCandidate } = require('../controllers/candidateController')

const router = express.Router()

// add new candidate
router.post('/add-candidate', upload.single('resume'), addCandidate)

// search for candidates
router.get('/search-candidate', searchCandidate)

// view single candidate
router.get('/view-candidate/:id', viewCandidate) 

// edit existing candidate
router.post('/edit-candidate/:id', upload.single('resume'), editCandidate)

// exporting router
module.exports = router